
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import LoadingSpinner from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children, requireAuth = false }: AuthGuardProps) => {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const currentPath = window.location.pathname;
      
      if (requireAuth && !isAuthenticated) {
        // Redirect to login if authentication is required but user is not logged in
        navigate('/login');
      } else if (isAuthenticated && user && (currentPath === '/login' || currentPath === '/signup')) {
        // Only redirect authenticated users away from login/signup pages
        switch (user.role) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'teacher':
            navigate('/teacher-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/student-dashboard');
        }
      }
    }
  }, [isAuthenticated, user, isLoading, navigate, requireAuth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AuthGuard;
