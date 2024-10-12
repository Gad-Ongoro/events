from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from . import models

# user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'is_google_user', 'is_verified', 'role', 'date_joined', 'updated_at')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        if not validated_data.get('is_google_user', False):
            validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
# profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'

# event
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = [
            'id', 'name', 'description', 'photo', 'organiser', 'start_date',
            'end_date', 'start_time', 'end_time', 'duration', 'venue',
        ]
        
# photo
class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Photo
        fields = '__all__'