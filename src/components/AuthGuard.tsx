import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import LoadingSpinner from "./LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children, requireAuth = false }: AuthGuardProps) => {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        navigate("/login", { replace: true });
      } else if (isAuthenticated && user) {
        // Only redirect if user is on login/signup pages
        if (location.pathname === "/login" || location.pathname === "/signup") {
          const dashboardPath =
            user.role === "teacher"
              ? "/teacher-dashboard"
              : user.role === "admin"
              ? "/admin-dashboard"
              : "/student-dashboard";

          navigate(dashboardPath, { replace: true });
        }
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    navigate,
    requireAuth,
    location.pathname,
    user?.role,
  ]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AuthGuard;
