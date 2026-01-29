from app import app, db, User

def reset_admin_password(new_password):
    with app.app_context():
        # Find the admin user
        # Ensure this matches the email you set in init_db()
        admin_email = "admin@rutere.com" 
        user = User.query.filter_by(email=admin_email).first()
        
        if user:
            user.set_password(new_password)
            db.session.commit()
            print(f"✅ Success! Password for {admin_email} has been reset.")
        else:
            print(f"❌ Error: User with email {admin_email} not found.")

if __name__ == "__main__":
    # Change 'new_password_here' to whatever you want your new password to be
    reset_admin_password("moses123")