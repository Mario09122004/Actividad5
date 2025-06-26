import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Verifica si hay token en localStorage
const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, permite el acceso
  return <Outlet />;
};

export default PrivateRoute;