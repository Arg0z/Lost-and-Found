import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';
import LoadingIndicator from './LoadingIndicator';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    try {
      const response = await api.post('/User/login', formData);
      if (response.status === 200) {
        console.log('Login successful');
        const { token } = response.data;
        localStorage.setItem('accessToken', token);

        const userResponse = await api.get('/User/user-information', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.status === 200) {
          const { id } = userResponse.data;
          localStorage.setItem('userId', id);
        }

        setIsAuthenticated(true);
        setSuccessMessage('Successfully logged in');
        navigate('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <LoadingIndicator isLoading={isLoading} />
      <h1>Lost and Found</h1>
      <div className="login-form">
        <h2>Login</h2>
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
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
