// Register.js

import React, { useState } from 'react';
import '../CSS/Register.css'; 
import loginImage from '../login-banner.jpg'
import Footer from '../components/Footer';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password.length >= 8;
  };

  const handleRegister = async () => {
    try {
      if (!validateEmail()) {
        setError('Invalid email address');
        return;
      }

      if (!validatePassword()) {
        setError('Password must be at least 8 characters long');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('User created successfully:', data);
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <>
     <img src={loginImage} alt="Login Banner" className="login-banner" />
    <div className="register-container"> {}
      <h2>Register</h2>
      <label>Email:</label>
      <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>Confirm Password:</label>
      <input type="password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      {error && <p className="error-message">{error}</p>} {/* Added className for error message */}

      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
    <Footer />
    </>
  );
}

export default Register;
