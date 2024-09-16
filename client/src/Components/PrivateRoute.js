// src/Components/PrivateRoute.js

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContent";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
