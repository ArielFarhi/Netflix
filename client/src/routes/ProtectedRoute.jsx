//need to change
import { Navigate, useLocation } from "react-router";
import { UserAuthProvider } from "../context/Authentication.jsx.jsx";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = UserAuthProvider();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
