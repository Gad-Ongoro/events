import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PasswordResetRequest() {
  let navigate = useNavigate();
  let [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email);

    fetch('https://event-project.onrender.com/reset_password/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': email })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('Not Found');
        }
      })
      .then(data => {
        console.log(data);
        localStorage.setItem('password_reset', data.token);
        navigate('/password_reset/new_password');
      });
  }

  function handleInputChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Reset Your Password</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetRequest;