import { Navigate } from "react-router-dom";
import { useAuthStore } from "../app/AuthStore"; // Make sure this path is correct

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const store = useAuthStore();
  const { accessToken, userRole, isAuthenticated } = store;

  return isAuthenticated && role.includes(userRole?.toUpperCase()) && accessToken ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export { ProtectedRoute };
