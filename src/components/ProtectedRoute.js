// src/components/ProtectedRoute.js
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!auth.token && location.pathname !== "/login") {
      toast.error("Please login to access this page", {
        toastId: "auth-required",
      });
    }
  }, [auth.token, location.pathname]);

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
