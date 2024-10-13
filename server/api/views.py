from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        print(self.request.user)
        return models.User.objects.filter(email = self.request.user)

class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
