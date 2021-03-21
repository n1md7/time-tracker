import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import useTokenUpdate from "../hooks/useTokenUpdate";
import Loading from "./Loading";

const ProtectedRoute = (props) => {
  const [isAuth, isLoading, errorMessage] = useTokenUpdate();

  if (isLoading) {
    return <Loading/>;
  }

  return !isAuth && !isLoading ?
    <Redirect to={{
      pathname: '/sign-in',
      state: {
        from: props.location
      }
    }}/> : <Route {...props}/>;
};

export default ProtectedRoute;
