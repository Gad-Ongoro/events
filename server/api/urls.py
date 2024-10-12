from django.urls import path
from . import views

urlpatterns = [
    # user
    path('users/', views.UserListApiView.as_view(), name='user-list'),
    path('users/register/', views.UserCreateApiView.as_view(), name='user-create'), # for normal signups
    path('users/<uuid:pk>/', views.UserDetailApiView.as_view(), name='user-detail'),
    
    # profile
    path('profiles/', views.ProfileListView.as_view(), name='Profile List'),
    path('profiles/<uuid:pk>/', views.ProfileDetailView.as_view(), name='Profile Detail'),
    
    # events
    path('events/', views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<uuid:pk>/', views.EventDetailView.as_view(), name='event-detail'),
    
    # photos
    path('photos/', views.PhotoListCreateView.as_view(), name='photo-list-create'),
    path('photos/<uuid:pk>', views.PhotoDetailView.as_view(), name='photo-detail'),
]