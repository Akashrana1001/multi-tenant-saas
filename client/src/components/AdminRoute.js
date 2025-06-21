import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) return <Navigate to="/" />;
  if (!user?.isAdmin) return <Navigate to="/home" />;

  return children;
};

export default AdminRoute;
