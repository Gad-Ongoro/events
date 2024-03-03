from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from uuid import uuid4
from datetime import datetime, timedelta
from app import app
from faker import Faker
from random import choice as rc

fake = Faker()

with app.app_context():
    User.query.delete()
    Profile.query.delete()
    Interests.query.delete()
    Tag.query.delete()
    Event.query.delete()
    Billing_Info.query.delete()
    Billing_Details.query.delete()
    Advert_Fees.query.delete()
    Pricing.query.delete()
    Review.query.delete()
    Booking.query.delete()
    Photo.query.delete()    
    
    session = db.session

    users = []
    profiles = []
    events = []
    photos = []
    prices = []
    billing_details = []
    advert_fees = []

    for i in range(10):
        user = User(
            id = uuid4(),
            email = fake.email(),
            password = fake.password(),
            role = rc([100, 101, 111]),
            confirmed = rc([True, False]),
            created_at = datetime.now()  
        )
        db.session.add(user)
        db.session.commit()
        users.append(user)

    for i, user in enumerate(users):
        profile = Profile(
            id=uuid4(),
            user_id=user.id,  
            first_name=f'User{i}',
            last_name=f'LastName{i}',
            profile_photo=f'https://example.com/photo{i}.jpg'
        )
        db.session.add(profile)
        profiles.append(profile)

    db.session.commit()

    image_urls = [
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/akili-02.jpg1707317289.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/WhatsApp_Image_2024-03-02_at_19.10.07_1.jpeg1709396522.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://marketplace.canva.com/EAFJMl8KcjI/1/0/1131w/canva-purple-black-tropical-party-club-poster-orVwDS2lrfY.jpg',
        'https://www.ticketsasa.com/components/com_enmasse/upload/davido__king_promise_1080_by_1080-4.jpg1707721788.jpg',
        'https://tlt-events.s3.amazonaws.com/4828/DEFAULT/c57fd18ae7130b3865995f224f85b4dbb911dd9fa96f8edea3715fc1e391cd29/da48edbe-814d-41f1-80c5-d0eb589ac96a.jpg',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/IMG-20240302-WA0007.jpg1709411677.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/jazzbythelake.png1708006194.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Virunga-Mountains-Marathon-Website-Image.png1708510546.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Save_the_date_KE.jpeg1702969299.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Afro-Coustic-2024-New-Venue1.png1708343562.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5'
        
    ]

    for i in range(10):
        photo = Photo(
            id=uuid4(),
            url=image_urls[i]
        )
        db.session.add(photo)
        photos.append(photo)

    db.session.commit()

    for i in range(10):
        event = Event(
            id=uuid4(),
            name=f'Event{i}',
            description=f'This is a description for Event{i}',
            organiser_id=users[i].id,  
            start_date=datetime.now() + timedelta(days=i),
            start_time=datetime.now(),  
            end_date=datetime.now() + timedelta(days=i+1),
            end_time=datetime.now(),  
            duration='1 hour',
            venue=f'Venue {i}',
            photo_id=photos[i].id,  
            created_at=datetime.now()  
        )
        db.session.add(event)
        events.append(event)

    db.session.commit()

    for i, user in enumerate(users):
        interest = Interests(
            id=uuid4(),
            event_id=events[i].id,  
            user_id=user.id  
        )
        db.session.add(interest)

    db.session.commit()

    for i, user in enumerate(users):
        tag = Tag(
            id=uuid4(),
            user_id=user.id, 
            name=f'tag{i}',
            event_id=events[i].id  
        )
        db.session.add(tag)

    db.session.commit()

    for i in range(10):
        billing_detail = Billing_Details(
            id=uuid4(),
            name=f'Billing Detail {i}',
            detail=f'This is a detail for Billing Detail {i}'
        )
        db.session.add(billing_detail)
        billing_details.append(billing_detail)

    db.session.commit()

    for i, user in enumerate(users):
        billing_info = Billing_Info(
            id=uuid4(),
            user_id=user.id,  
            payment_method='credit_card',
            payment_details_id=billing_details[i].id 
        )
        db.session.add(billing_info)

    db.session.commit()

    for i, event in enumerate(events):
        pricing = Pricing(
            event_id=event.id, 
            id=uuid4(),
            name=f'Pricing {i}',
            amount=float(i*10)
        )
        db.session.add(pricing)
        prices.append(pricing)

    db.session.commit()

    for i, user in enumerate(users):
        review = Review(
            id=uuid4(),
            user_id=user.id, 
            event_id=events[i].id,  
            comment=f'This is a comment {i}',
            rating=i
        )
        db.session.add(review)

    db.session.commit()

    for i, user in enumerate(users):
        booking = Booking(
            id=uuid4(),
            event_id=events[i].id, 
            user_id=user.id,  
            pricing_id=pricing.id,  
            date_created=datetime.now()  
        )
        db.session.add(booking)

    db.session.commit()

    for i, user in enumerate(users):
        for event in events:
            advert_fee = Advert_Fees(
                id=uuid4(),
                user_id=user.id,  
                event_id=event.id,  
                amount=float(i*10),
                created_at=datetime.now()  
            )
            db.session.add(advert_fee)
            advert_fees.append(advert_fee)

    db.session.commit()

print("Seed data has been added to the database.")
