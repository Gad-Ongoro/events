from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.conf import settings
from .utils import verify_google_id_token

User = get_user_model()

# React.JS (react-oauth/google) Credential Handler
class ReactGoogleOAuthCredentialHandler(APIView):
    def post(self, request):
        credentials = request.data.get('credentials')
        
        try:
            # CLIENT_ID of the app that accesses the backend:
            idinfo = verify_google_id_token(credentials)
            
            if not idinfo:
                return Response({'error': 'Invalid token'}, status=400)

            # user's Google Account info
            userid = idinfo['sub']
            user_email = idinfo.get('email')
            user_name = idinfo.get('name')
        
            # create or get the user
            user, created = User.objects.get_or_create(email=user_email, defaults={
                'first_name': user_name.split()[0],
                'last_name': user_name.split()[1] if len(user_name.split()) > 1 else '',
                'email': user_email,
                'is_google_user': True,
                'is_verified': True,
            })
            
            # JWT tokens
            refresh = RefreshToken.for_user(user)

            return JsonResponse({
                'email': user.email,
                'name': user_name,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })

        except ValueError:
            # Invalid credentials
            return Response({'error': 'Invalid token'}, status=400)
