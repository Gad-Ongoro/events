from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from api.models import Profile, Event

User = get_user_model()

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='anonuser@gmail.com',
            password='AnonPassword123!',
            first_name='Anon',
            last_name='User',
            role=100
        )
    
    def test_user_creation(self):
        self.assertEqual(self.user.email, 'anonuser@gmail.com')
        self.assertTrue(self.user.check_password('AnonPassword123!'))
        self.assertEqual(self.user.role, 100)
        self.assertEqual(self.user.name, 'Anon User')
    
    def test_create_superuser(self):
        superuser = User.objects.create_superuser(
            email='admin@gmail.com',
            password='SuperPass123!',
            first_name='Admin',
            last_name='User'
        )
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_staff)
    
    def test_user_email_unique(self):
        with self.assertRaises(IntegrityError):
            User.objects.create_user(email='anonuser@gmail.com', password='AnotherPass123!')

    def test_profile_created_on_user_creation(self):
        self.assertIsInstance(self.user.profile, Profile)
        self.assertEqual(self.user.profile.user, self.user)


class EventModelTest(TestCase):
    def setUp(self):
        # organiser
        self.organiser = User.objects.create_user(
            email='organiser@gmail.com',
            password='OrgPass123!',
            first_name='Event',
            last_name='Organiser',
            role=1000
        )

        # event
        self.event = Event.objects.create(
            name="Test Event",
            description="This is a test event",
            organiser=self.organiser,
            start_date="2024-12-01",
            start_time="12:00",
            end_date="2024-12-01",
            end_time="14:00",
            duration="2 hours",
            venue="Test Venue",
            confirmed=False
        )
    
    def test_event_creation(self):
        self.assertEqual(self.event.name, "Test Event")
        self.assertEqual(self.event.description, "This is a test event")
        self.assertEqual(self.event.organiser, self.organiser)
        self.assertEqual(self.event.venue, "Test Venue")
        self.assertFalse(self.event.confirmed)

    def test_event_update(self):
        self.event.confirmed = True
        self.event.save()
        updated_event = Event.objects.get(id=self.event.id)
        self.assertTrue(updated_event.confirmed)
    
    def test_event_deletion(self):
        event_id = self.event.id
        self.event.delete()
        with self.assertRaises(Event.DoesNotExist):
            Event.objects.get(id=event_id)
