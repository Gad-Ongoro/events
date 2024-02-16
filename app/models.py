from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, Boolean, Enum, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = Column(UUID, primary_key=True)
    password = Column(String)
    confirmed = Column(Boolean)
    role = Column(Integer)
    created_at = Column(DateTime)
    email = Column(String)

    def jsonify(self):
        return {
            'id': str(self.id),
            'password': self.password,
            'confirmed': self.confirmed,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'email': self.email
        }

class Profile(db.Model):
    __tablename__ = 'Profile'
    id = Column(UUID, primary_key=True)
    user = relationship('User', backref='profiles')
    user_id = Column(UUID, ForeignKey('user.id'))
    first_name = Column(String)
    last_name = Column(String)
    profile_photo = Column(String)
    

class Interests(db.Model):
    __tablename__ = 'Interests'
    id = Column(UUID, primary_key=True)
    event_id = Column(UUID, ForeignKey('Event.id'))
    user_id = Column(UUID, ForeignKey('user.id'))
    # user = relationship('User', backref='interests')
    # event = relationship('Event', backref='interests')

    def jsonify(self):
        return {
            'id': str(self.id),
            'event_id': str(self.event_id),
            'user_id': str(self.user_id),
            # 'user' : self.user,
            # 'event' : self.event
        }

class Tag(db.Model):
    __tablename__ = 'tag'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    name = Column(String)
    event_id = Column(UUID, ForeignKey('Event.id'))
    event = relationship('Event', backref='tags')
    user = relationship('User', backref='tags')
    

class Event(db.Model):
    __tablename__ = 'Event'
    id = Column(UUID, primary_key=True)
    name = Column(String)
    description = Column(String)
    organiser_id = Column(UUID, ForeignKey('user.id'))
    organiser = relationship('User', backref='events')
    start_date = Column(DateTime)
    start_time = Column(DateTime)
    end_date = Column(DateTime)
    end_time = Column(DateTime)
    duration = Column(String)
    venue = Column(String)
    photo_id = Column(UUID, ForeignKey('Photo.id'))
    created_at = Column(DateTime)
    photo = relationship('Photo', backref='events')

class Billing_Info(db.Model):
    __tablename__ = 'Billing_Info'
    id = Column(UUID, primary_key=True)
    payment_method = Column(Enum('credit_card', 'm_pesa', 'airtel_money', name='Ptype'))
    payment_details_id = Column(UUID, ForeignKey('Billing_Details.id'))
    billing_details = relationship('Billing_Details', backref='billing_infos')
    user_id = Column(UUID, ForeignKey('user.id'))
    user = relationship('User', backref='billing_infos')

class Billing_Details(db.Model):
    __tablename__ = 'Billing_Details'
    id = Column(UUID, primary_key=True)
    detail = Column(String)
    name = Column(String)
    

class Advert_Fees(db.Model):
    __tablename__ = 'Advert_Fees'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    user = relationship('User', backref='advert_fees')
    amount = Column(Float)
    event = relationship('Event', backref='advert_fees')
    event_id = Column(UUID, ForeignKey('Event.id'))
    created_at = Column(DateTime)
    
    

class Pricing(db.Model):
    __tablename__ = 'Pricing'
    event_id = Column(UUID, ForeignKey('Event.id'))
    event = relationship('Event', backref='pricings')
    id = Column(UUID, primary_key=True)
    name = Column(String)
    amount = Column(Float)
    

class Review(db.Model):
    __tablename__ = 'Review'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    event_id = Column(UUID, ForeignKey('Event.id'))
    event = relationship('Event', backref='reviews')
    rating = Column(Integer)
    comment = Column(String)
    user = relationship('User', backref='reviews')
    
    

class Booking(db.Model):
    __tablename__ = 'Booking'
    id = Column(UUID, primary_key=True)
    event_id = Column(UUID, ForeignKey('Event.id'))
    user_id = Column(UUID, ForeignKey('user.id'))
    user = relationship('User', backref='bookings')
    pricing_id = Column(UUID, ForeignKey('Pricing.id'))
    pricing = relationship('Pricing', backref='bookings')
    date_created = Column(DateTime)
    event = relationship('Event', backref='bookings')
    

class Photo(db.Model):
    __tablename__ = 'Photo'
    id = Column(UUID, primary_key=True)
    url = Column(String)