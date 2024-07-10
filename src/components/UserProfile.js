import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://sheridanlostandfound.azurewebsites.net/api/User/user-information', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRoles = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://sheridanlostandfound.azurewebsites.net/api/Users/get-roles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setRoles(response.data);
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    fetchUserInfo();
    fetchUserRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put('https://sheridanlostandfound.azurewebsites.net/api/User/update', userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        alert('Profile updated successfully');
      } else {
        alert('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profile update failed');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
      {roles.includes('Admin') && (
        <div className="admin-info">
          <h2>Admin Information</h2>
          <p>Role: Admin</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;