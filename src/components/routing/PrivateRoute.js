import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, loadUser } = useContext(AuthContext);

  useEffect(() => {
    console.log('PrivateRoute - Loading user data');
    loadUser();
    // eslint-disable-next-line
  }, []);

  console.log('PrivateRoute - Auth state:', { isAuthenticated, loading });

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
