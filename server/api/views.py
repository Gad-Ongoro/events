from django.shortcuts import render
from rest_framework import generics, permissions
from . import models
from . import serializers

# Create your views here.
# user
class UserCreateApiView(generics.CreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.AllowAny]
    
class UserListApiView(generics.ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class UserDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.User.objects.filter(user = self.request.user)
    
# profile
class ProfileListView(generics.ListAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return models.Profile.objects.filter(user=self.request.user)

# event
class EventListCreateView(generics.ListCreateAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
# photo
class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = models.Photo.objects.all()
    serializer_class = serializers.PhotoSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class PhotoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Photo.objects.all()
    serializer_class = serializers.PhotoSerializer
    # permission_classes = [permissions.IsAuthenticated]
