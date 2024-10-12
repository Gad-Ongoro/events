from django.urls import path
from .views import ReactGoogleOAuthCredentialHandler

urlpatterns = [    
    path('javascriptOAuthCallBack/', ReactGoogleOAuthCredentialHandler.as_view(), name='oauth2_javascriptCallBack'),
]
