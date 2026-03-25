import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          alert("Google Login Successful ✅");
        }}
        onError={() => {
          alert("Google Login Failed ❌");
        }}
      />
    </div>
  );
}

export default Login;