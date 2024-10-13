from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid

# Create your models here.
# custom user model
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = None
    is_google_user = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
 
    @property
    def name(self):
        return f'{self.first_name} {self.last_name}'
    
    @property
    def code(self):
        return self.id
    
# profile
class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    secondary_email = models.EmailField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    county = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=100, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='event_profile_imgs', null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

# event
class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    organiser = models.ForeignKey('User', on_delete=models.CASCADE, related_name='events')
    start_date = models.CharField(max_length=255)
    start_time = models.CharField(max_length=255)
    end_date = models.CharField(max_length=255)
    end_time = models.CharField(max_length=255)
    duration = models.CharField(max_length=255)
    venue = models.CharField(max_length=255)
    confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# photo 
class Photo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='photo')
    url = models.URLField(max_length=200)

    def __str__(self):
        return self.url