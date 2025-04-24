import { Navigate, useLocation } from "react-router";
import { useUserAuth } from "../context/Authentication.jsx";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useUserAuth();
  const location = useLocation();

  if (isLoading) return null; 

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
