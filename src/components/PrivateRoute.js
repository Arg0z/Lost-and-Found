import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRoles }) => {
  const accessToken = localStorage.getItem('accessToken');
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && userRoles) {
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/" />;
  }
  }

  return children;
};

export default PrivateRoute;
