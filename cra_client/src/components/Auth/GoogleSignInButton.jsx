import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAppContext } from '../../services/utils';

const GoogleSigninButton = () => {
  const { googleLogin } = useAppContext();
  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          googleLogin(credentialResponse.credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
};

export default GoogleSigninButton;