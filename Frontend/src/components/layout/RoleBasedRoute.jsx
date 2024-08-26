import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const RoleBasedRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== role) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
