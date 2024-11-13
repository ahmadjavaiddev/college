import { Navigate } from "react-router-dom";
import { useAuthStore } from "../app/AuthStore";
import { useLoadingStore } from "../app/LoadingStore";
import Loading from "../components/Admin/Loading";

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
    const { accessToken, userRole, isAuthenticated } = useAuthStore();
    const { isLoading } = useLoadingStore();

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
