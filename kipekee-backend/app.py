import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://rutererealty.com", "https://www.rutererealty.com", "http://localhost:5173"]}})

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'kipekee.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = os.path.join(app.root_path, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

def safe_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return 0

class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False) 
    price = db.Column(db.String(50), nullable=False) 
    size = db.Column(db.Integer) 
    beds = db.Column(db.Integer)
    baths = db.Column(db.Integer)
    status = db.Column(db.String(50), default="Available") 

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'price': self.price,
            'size': self.size,
            'beds': self.beds,
            'baths': self.baths,
            'status': self.status
        }

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    suitability = db.Column(db.String(50), default="Home Living")
    
    rental_yield = db.Column(db.String(50), default="0%")
    annual_growth = db.Column(db.String(50), default="0%")
    market_comparison = db.Column(db.String(50), default="Average")
    analytics_text = db.Column(db.Text, default="") 
    
    nearby_schools = db.Column(db.String(200), default="")
    nearby_hospitals = db.Column(db.String(200), default="")
    nearby_shopping = db.Column(db.String(200), default="")
    
    beds = db.Column(db.Integer)
    baths = db.Column(db.Integer)
    sqm = db.Column(db.Integer)
    description = db.Column(db.Text, nullable=False)
    amenities = db.Column(db.String(500)) 
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    property_images = db.relationship('PropertyImage', backref='property', lazy=True, cascade="all, delete-orphan")
    units = db.relationship('Unit', backref='property', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        base_url = request.host_url.rstrip('/')
        real_images_list = []
        
        for img in self.property_images:
            if img.image_url.startswith('http'):
                real_images_list.append(img.image_url)
            else:
                real_images_list.append(f"{base_url}/static/{img.image_url}")

        units_list = [u.to_dict() for u in self.units]

        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'location': self.location,
            'type': self.type,
            'status': self.status,
            'suitability': self.suitability,
            'rental_yield': self.rental_yield,
            'annual_growth': self.annual_growth,
            'market_comparison': self.market_comparison,
            'analytics_text': self.analytics_text,
            'nearby_schools': self.nearby_schools,
            'nearby_hospitals': self.nearby_hospitals,
            'nearby_shopping': self.nearby_shopping,
            'beds': self.beds,
            'baths': self.baths,
            'sqm': self.sqm,
            'description': self.description,
            'amenities': self.amenities.split(',') if self.amenities else [],
            'is_featured': self.is_featured,
            'images': real_images_list,
            'units': units_list
        }

class PropertyImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.Text, nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)

class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    message = db.Column(db.Text, nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default="New") 

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'message': self.message,
            'property_id': self.property_id,
            'created_at': self.created_at.isoformat() + 'Z',
            'status': self.status 
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat() + 'Z'
        }

def init_db():
    with app.app_context():
        db.create_all()
        if User.query.count() == 0:
            admin = User(email="admin@kipekee.com")
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()

@app.route('/api/admin/update', methods=['PUT'])
def update_admin():
    data = request.get_json()
    user = User.query.first()
    
    if 'current_password' in data and not user.check_password(data['current_password']):
        return jsonify({"message": "Incorrect current password"}), 401

    if 'email' in data and data['email']:
        user.email = data['email']
    
    if 'new_password' in data and data['new_password']:
        user.set_password(data['new_password'])
        
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if user and user.check_password(data.get('password')):
        return jsonify({"message": "Success", "status": "success"})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/api/properties', methods=['GET'])
def get_properties():
    featured_only = request.args.get('featured')
    if featured_only == 'true':
        properties = Property.query.filter_by(is_featured=True).order_by(Property.id.desc()).all()
    else:
        properties = Property.query.order_by(Property.id.desc()).all()  
    return jsonify([p.to_dict() for p in properties])

@app.route('/api/properties/<int:id>', methods=['GET'])
def get_single_property(id):
    prop = Property.query.get_or_404(id)
    return jsonify(prop.to_dict())

@app.route('/api/properties/<int:id>', methods=['PUT'])
def update_property(id):
    try:
        prop = Property.query.get_or_404(id)
        
        prop.title = request.form['title']
        prop.price = request.form['price']
        prop.location = request.form['location']
        prop.type = request.form['type']
        prop.status = request.form['status']
        prop.suitability = request.form.get('suitability', 'Home Living')
        prop.rental_yield = request.form.get('rental_yield', 'N/A')
        prop.annual_growth = request.form.get('annual_growth', 'N/A')
        prop.market_comparison = request.form.get('market_comparison', 'Average')
        prop.analytics_text = request.form.get('analytics_text', '')
        prop.nearby_schools = request.form.get('nearby_schools', '')
        prop.nearby_hospitals = request.form.get('nearby_hospitals', '')
        prop.nearby_shopping = request.form.get('nearby_shopping', '')
        
        prop.beds = safe_int(request.form.get('beds'))
        prop.baths = safe_int(request.form.get('baths'))
        prop.sqm = safe_int(request.form.get('sqm'))
        
        prop.description = request.form['description']
        prop.amenities = request.form['amenities']
        prop.is_featured = request.form.get('is_featured') == 'true'

        files = request.files.getlist('images') 
        for file in files:
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                unique_filename = str(uuid.uuid4())[:8] + "_" + filename
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
                relative_path = 'uploads/' + unique_filename
                new_image = PropertyImage(image_url=relative_path, property_id=prop.id)
                db.session.add(new_image)

        Unit.query.filter_by(property_id=prop.id).delete()
        
        base_beds = safe_int(request.form.get('beds'))
        base_unit_type = "Studio" if base_beds == 0 else f"{base_beds} Bed Base"
        
        base_unit = Unit(
            property_id=prop.id,
            type=base_unit_type,
            price=request.form['price'],
            size=safe_int(request.form.get('sqm')),
            beds=base_beds,
            baths=safe_int(request.form.get('baths'))
        )
        db.session.add(base_unit)

        unit_types = request.form.getlist('unit_types')
        unit_prices = request.form.getlist('unit_prices')
        unit_sizes = request.form.getlist('unit_sizes')
        unit_beds = request.form.getlist('unit_beds')
        unit_baths = request.form.getlist('unit_baths')

        for i in range(len(unit_types)):
            if unit_types[i]:
                new_unit = Unit(
                    property_id=prop.id,
                    type=unit_types[i],
                    price=unit_prices[i],
                    size=safe_int(unit_sizes[i]),
                    beds=safe_int(unit_beds[i]),
                    baths=safe_int(unit_baths[i]) if i < len(unit_baths) else 0
                )
                db.session.add(new_unit)

        db.session.commit()
        return jsonify({"message": "Property Updated Successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/properties', methods=['POST'])
def add_property():
    try:
        beds_val = safe_int(request.form.get('beds'))
        baths_val = safe_int(request.form.get('baths'))
        sqm_val = safe_int(request.form.get('sqm'))

        new_property = Property(
            title=request.form['title'],
            price=request.form['price'],
            location=request.form['location'],
            type=request.form['type'],
            status=request.form['status'],
            suitability=request.form.get('suitability', 'Home Living'),
            rental_yield=request.form.get('rental_yield', 'N/A'),
            annual_growth=request.form.get('annual_growth', 'N/A'),
            market_comparison=request.form.get('market_comparison', 'Average'),
            analytics_text=request.form.get('analytics_text', ''),
            nearby_schools=request.form.get('nearby_schools', ''),
            nearby_hospitals=request.form.get('nearby_hospitals', ''),
            nearby_shopping=request.form.get('nearby_shopping', ''),
            beds=beds_val,
            baths=baths_val,
            sqm=sqm_val,
            description=request.form['description'],
            amenities=request.form['amenities'],
            is_featured=request.form.get('is_featured') == 'true',
        )

        db.session.add(new_property)
        db.session.commit() 

        base_unit_type = "Studio" if beds_val == 0 else f"{beds_val} Bed Base"
        base_unit = Unit(
            property_id=new_property.id,
            type=base_unit_type,
            price=request.form['price'],
            size=sqm_val,
            beds=beds_val,
            baths=baths_val
        )
        db.session.add(base_unit)

        files = request.files.getlist('images') 
        for file in files:
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                unique_filename = str(uuid.uuid4())[:8] + "_" + filename
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
                relative_path = 'uploads/' + unique_filename
                new_image = PropertyImage(image_url=relative_path, property_id=new_property.id)
                db.session.add(new_image)
        
        unit_types = request.form.getlist('unit_types')
        unit_prices = request.form.getlist('unit_prices')
        unit_sizes = request.form.getlist('unit_sizes')
        unit_beds = request.form.getlist('unit_beds')
        unit_baths = request.form.getlist('unit_baths')

        for i in range(len(unit_types)):
            if unit_types[i]:
                new_unit = Unit(
                    property_id=new_property.id,
                    type=unit_types[i],
                    price=unit_prices[i],
                    size=safe_int(unit_sizes[i]),
                    beds=safe_int(unit_beds[i]),
                    baths=safe_int(unit_baths[i]) if i < len(unit_baths) else 0
                )
                db.session.add(new_unit)

        db.session.commit()
        return jsonify({"message": "Property Added!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/units/<int:id>/status', methods=['PATCH'])
def update_unit_status(id):
    unit = Unit.query.get_or_404(id)
    data = request.get_json()
    if 'status' in data:
        unit.status = data['status']
    db.session.commit()
    return jsonify({"message": "Unit status updated", "unit": unit.to_dict()})

@app.route('/api/properties/<int:id>/status', methods=['PATCH'])
def update_property_status(id):
    property = Property.query.get_or_404(id)
    data = request.get_json()
    if 'status' in data:
        new_status = data['status']
        property.status = new_status
        if new_status in ['Sold', 'Rented', 'Off Market']:
            for unit in property.units:
                unit.status = 'Sold'
    db.session.commit()
    return jsonify({"message": "Property and Unit statuses updated"})

@app.route('/api/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    prop = Property.query.get_or_404(id)
    db.session.delete(prop)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

@app.route('/api/inquiries', methods=['POST'])
def add_inquiry():
    data = request.get_json()
    new_inquiry = Inquiry(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        message=data.get('message'),
        property_id=data.get('property_id') 
    )
    db.session.add(new_inquiry)
    db.session.commit()
    return jsonify({"message": "Message Sent!"}), 201

@app.route('/api/inquiries', methods=['GET'])
def get_inquiries():
    inquiries = Inquiry.query.order_by(Inquiry.id.desc()).all()
    return jsonify([i.to_dict() for i in inquiries])

@app.route('/api/inquiries/<int:id>', methods=['DELETE'])
def delete_inquiry(id):
    inquiry = Inquiry.query.get_or_404(id)
    db.session.delete(inquiry)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

@app.route('/api/inquiries/<int:id>', methods=['PUT', 'PATCH'])
def update_inquiry_status(id):
    inquiry = Inquiry.query.get_or_404(id)
    data = request.get_json()
    if 'status' in data:
        inquiry.status = data['status']
    db.session.commit()
    return jsonify({"message": "Status updated"})

@app.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    return jsonify([]) 

@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"message": "Email required"}), 400
        
    existing = Subscriber.query.filter_by(email=email).first()
    if existing:
        return jsonify({"message": "Already subscribed"}), 400
        
    new_sub = Subscriber(email=email)
    db.session.add(new_sub)
    db.session.commit()
    return jsonify({"message": "Subscribed successfully"}), 201

@app.route('/api/subscribers', methods=['GET'])
def get_subscribers():
    subs = Subscriber.query.order_by(Subscriber.id.desc()).all()
    return jsonify([s.to_dict() for s in subs])

@app.route('/api/subscribers/<int:id>', methods=['DELETE'])
def delete_subscriber(id):
    sub = Subscriber.query.get_or_404(id)
    db.session.delete(sub)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)