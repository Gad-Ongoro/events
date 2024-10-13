from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
from random import choice as rc
from datetime import timedelta
from api.models import User, Profile, Event, Photo

fake = Faker()

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Event.objects.all().delete()
        Photo.objects.all().delete()
        Profile.objects.all().delete()
        User.objects.all().delete()

        users = []
        events = []
        photos = []

        # Create users
        for i in range(10):
            user = User.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
            )
            user.set_password(fake.password())
            user.save()
            users.append(user)

        # Create events
        event_names = [
            "Sparkling Soiree", "Midnight Masquerade", "Garden Gala", "Enchanted Evening",
            "Moonlit Mixer", "Starry Night Spectacular", "Twilight Tango", "Sapphire Serenade",
            "Mystic Moonlight", "Emerald Elegance"
        ]

        event_descriptions = [
            "A glamorous evening filled with sparkling lights and enchanting music.",
            "An elegant masked ball under the cloak of midnight.",
            "A delightful gathering amidst blooming flowers and lush greenery.",
            "Step into a fairytale world of wonder and magic.",
            "Dance under the stars in a dreamy atmosphere.",
            "An evening of enchantment and celestial splendor.",
            "Dance the night away as twilight falls upon the city.",
            "A luxurious event adorned with shades of sapphire and elegance.",
            "A mysterious affair bathed in the glow of the moon.",
            "Experience sophistication and grace in a sea of emerald hues.",
            "Shine bright like gold in an evening of glamour and opulence.",
            "Bid farewell to the day in a serene and picturesque setting.",
            "A celestial-themed celebration under the vast night sky.",
            "Immerse yourself in the beauty of dancing lights and colors.",
            "Celebrate the bounties of the harvest season with joy and merriment.",
            "Embrace the magic of winter in a whimsical wonderland.",
            "Welcome the arrival of spring with laughter and joy.",
            "Celebrate the longest day of the year with a vibrant gathering.",
            "Fall into the warmth of autumn with music and laughter.",
            "Gather around the fire for cozy conversations and festive cheer."
        ]

        for i in range(10):
            event = Event.objects.create(
                name=event_names[i],
                description=rc(event_descriptions),
                organiser=users[i],
                start_date=timezone.now() + timedelta(days=i),
                start_time=timezone.now(),
                end_date=timezone.now() + timedelta(days=i + 1),
                end_time=timezone.now(),
                duration=rc(['4 Hours', '8 Hours', '12 Hours', '16 Hours']),
                venue=rc(['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Nakuru']),
                confirmed=rc([True, False]),
            )
            events.append(event)

        image_urls = [
            'https://static.kenyabuzz.com/posters/events/38419_1723646607244.jpeg',
            'https://static.kenyabuzz.com/posters/events/null_1722869108464.jpeg',
            'https://marketplace.canva.com/EAFJMl8KcjI/1/0/1131w/canva-purple-black-tropical-party-club-poster-orVwDS2lrfY.jpg',
            'https://static.kenyabuzz.com/posters/events/38126_1722657171186.jpg',
            'https://static.kenyabuzz.com/posters/events/null_1723974442725.jpg',
            'https://static.kenyabuzz.com/posters/events/null_1719497951366.jpeg',
            'https://static.kenyabuzz.com/posters/events/38420_1723387989385.jpg',
            'https://static.kenyabuzz.com/posters/events/null_1723537767674.png',
            'https://static.kenyabuzz.com/posters/events/null_1708072968198.jpg',
            'https://static.kenyabuzz.com/posters/events/null_1715670122739.PNG'
        ]

        for i in range(10):
            photo = Photo.objects.create(
                event=events[i],
                url=image_urls[i]
            )
            photos.append(photo)

        self.stdout.write(self.style.SUCCESS('✨✨✨✨ Database seeded successfully.✨✨✨✨'))
