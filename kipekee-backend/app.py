import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kipekee.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = os.path.join(app.root_path, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50))
    status = db.Column(db.String(50))
    beds = db.Column(db.Integer)
    baths = db.Column(db.Integer)
    sqft = db.Column(db.Integer)
    description = db.Column(db.Text)
    amenities = db.Column(db.Text) 
    is_featured = db.Column(db.Boolean, default=False) 
    
    images = db.relationship('PropertyImage', backref='property', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'location': self.location,
            'type': self.type,
            'status': self.status,
            'beds': self.beds,
            'baths': self.baths,
            'sqft': self.sqft,
            'description': self.description,
            'amenities': self.amenities.split(',') if self.amenities else [],
            'is_featured': self.is_featured,
            'images': [img.image_url for img in self.images]
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

def init_db():
    with app.app_context():
        db.create_all()
        if User.query.count() == 0:
            admin = User(email="admin@kipekee.com")
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()


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

@app.route('/api/properties', methods=['POST'])
def add_property():
    try:
        new_property = Property(
            title=request.form['title'],
            price=request.form['price'],
            location=request.form['location'],
            type=request.form['type'],
            status=request.form['status'],
            beds=int(request.form['beds']),
            baths=int(request.form['baths']),
            sqft=int(request.form['sqft']),
            description=request.form['description'],
            amenities=request.form.get('amenities', ''),
            is_featured=request.form.get('is_featured') == 'true'
        )
        db.session.add(new_property)
        db.session.commit() 

        files = request.files.getlist('images') 
        
        for file in files:
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                import uuid
                unique_filename = str(uuid.uuid4())[:8] + "_" + filename
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
                
                full_url = request.host_url + 'static/uploads/' + unique_filename
                
                new_image = PropertyImage(image_url=full_url, property_id=new_property.id)
                db.session.add(new_image)
        
        db.session.commit()
        return jsonify({"message": "Property Added!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    prop = Property.query.get_or_404(id)
    db.session.delete(prop)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

@app.route('/api/properties/<int:id>/status', methods=['PATCH'])
def update_property_status(id):
    property = Property.query.get_or_404(id)
    data = request.get_json()
    
    if 'status' in data:
        property.status = data['status']
        
    db.session.commit()
    return jsonify({"message": "Property status updated"})

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

@app.route('/api/inquiries/<int:id>', methods=['PUT'])
def update_inquiry_status(id):
    inquiry = Inquiry.query.get_or_404(id)
    data = request.get_json()
    if 'status' in data:
        inquiry.status = data['status']
    db.session.commit()
    return jsonify({"message": "Status updated"})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)