import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7224/api/auth/login', formData);
      if (response.status === 200) {
        console.log('Login successful');
        // Redirect to home page or set user in state
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Lost and Found</h1>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        <p>Forgot your password? <a href="/forgot-password">Reset Password</a></p>
      </div>
    </div>
  );
}

export default Login;
