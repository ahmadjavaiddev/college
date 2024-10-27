import { Navigate } from "react-router-dom";
import { useAuthStore } from "../app/AuthStore";
import { useEffect } from "react";
import { useLoadingStore } from "../app/LoadingStore";
import Loading from "../components/Admin/Loading";

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const { accessToken, userRole, isAuthenticated, verify, logout } =
    useAuthStore();
  const { isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    (async () => {
      try {
        if (accessToken && userRole) {
          await verify();
        }
        setLoading(false);
      } catch (error) {
        console.error("ProtectedRoute error:", error);
        logout();
        window.location.assign("/login");
      }
    })();
  }, [verify, setLoading]);

  if (isLoading) return <Loading />;

  if (
    isAuthenticated &&
    role.includes(userRole?.toUpperCase()) &&
    accessToken
  ) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" replace />;
};

export { ProtectedRoute };
