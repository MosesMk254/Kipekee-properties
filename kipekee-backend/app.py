from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kipekee.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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
    image_url = db.Column(db.Text)

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
            'image_url': self.image_url
        }

def init_db():
    with app.app_context():
        db.create_all() 
        
        if Property.query.count() == 0:
            print("Database is empty. Seeding with initial data...")
            p1 = Property(
                title="Modern Glass Villa Runda",
                price="KES 85,000,000",
                location="Runda, Nairobi",
                type="Villa",
                status="For Sale",
                beds=5, baths=6, sqft=4500,
                description="Luxury glass villa with infinity pool.",
                image_url="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop"
            )
            p2 = Property(
                title="Skyline Penthouse Westlands",
                price="KES 250,000 / mo",
                location="Westlands, Nairobi",
                type="Penthouse",
                status="For Rent",
                beds=3, baths=3, sqft=2800,
                description="Panoramic views of the city.",
                image_url="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop"
            )
            db.session.add_all([p1, p2])
            db.session.commit()
            print("Seeding Complete!")


@app.route('/')
def home():
    return "Kipekee Backend Running on SQLite!"

@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([p.to_dict() for p in properties])

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)