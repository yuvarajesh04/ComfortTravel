import type React from "react";
import { useAuth } from "./context/Authcontext";
import { Navigate } from "react-router-dom";

interface ProtectedRoute {
    children: React.ReactNode,
    allowedRole: 'admin' | 'user'
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRoute) => {
    const user = useAuth();

    if (!user || !user.user?.userType)
        return <Navigate to="/login" replace />

    if (allowedRole && !allowedRole.includes(user.user?.userType)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;