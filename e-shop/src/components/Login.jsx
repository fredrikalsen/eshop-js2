// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../login-banner.jpg'
import Footer from '../components/Footer';
import '../CSS/Login.css'; 

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('User Token:', data.token);
        console.log('User logged in');

        localStorage.setItem('userToken', data.token);

        if (typeof onSuccess === 'function') {
          onSuccess();
        }

        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <>
     <img src={loginImage} alt="Login Banner" className="login-banner" />
    <div className="login-container">
     
      <h2>Login</h2>
      <label htmlFor="email" className="input-label">
        Email:
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
      </label>

      <label htmlFor="password" className="input-label">
        Password:
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="input-field" />
      </label>

      <button onClick={handleLogin} className="login-button">
        Login
      </button>

      <p className="register-link">
        Don't have an account? <Link to="/register" className="register-link-text">Register here</Link>
      </p>
    </div>
    <Footer />
    </>
  );
}
