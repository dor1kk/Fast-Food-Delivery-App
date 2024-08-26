import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const ProtectedRoute = ({ element }) => {
  const { authToken } = useContext(AuthContext);
  const location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
