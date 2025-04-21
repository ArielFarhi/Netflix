import React from "react";
import { useUserAuth } from "../context/Authentication.jsx";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
