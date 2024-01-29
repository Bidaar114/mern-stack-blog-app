import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from './useUser';




const PrivateRoute = () => {


  const{user} = useUser();

  // const token = Cookies.get('token');
  const location = useLocation();

  if (!user) {
    // not logged in, so redirect to login page with the return URL
    return <Navigate to="/login" state = {{ from: location }} replace />;
  }

  // returns child route elements
  return <Outlet/>;
};

export default PrivateRoute;







