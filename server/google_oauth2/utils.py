from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings

def verify_google_id_token(id_token_value):
    return id_token.verify_oauth2_token(
        id_token_value, requests.Request(), settings.GOOGLE_OAUTH2_CLIENT_ID
    )