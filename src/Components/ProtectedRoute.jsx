import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children, authRequired }) => {
  const { token, isNotForcedLogout } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!token && authRequired) {
      if (isNotForcedLogout) {
        alert("You are not authorized to access this page");
      }
    }
  }, [token, authRequired, isNotForcedLogout]);

  if (!token && authRequired) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (token && !authRequired) {
    return <Navigate to="/home" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
