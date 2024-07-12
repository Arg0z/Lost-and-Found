import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
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
        const response = await axios.get('https://sheridanlostandfound.azurewebsites.net/api/User/get-roles', {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="user-info">
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </div>
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
