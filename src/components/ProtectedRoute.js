import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  const {
    getAuthenticatedUser,
    user,
    loading,
    setLoadingTrue,
    setLoadingFalse,
  } = userContext;

  useEffect(() => {
    (async () => {
      setLoadingTrue();
      await getAuthenticatedUser();
      setLoadingFalse();
      return;
    })();
  }, [loading]);

  if (loading === true || !user) return <Spinner />;
  else
    return (
      <Route
        {...rest}
        render={(props) => {
          if (user) {
            return <Component {...rest} {...props} />;
          } else {
            return <Redirect to='/' />; // could redirect to an unauthorized component if we like *stretch*
          }
        }}
      />
    );
};

export default ProtectedRoute;

// https://dev.to/mychal/protected-routes-with-react-function-components-dh#:~:text=Protected%20routes%20allow%20us%20to,may%20contain%20private%20user%20information.
