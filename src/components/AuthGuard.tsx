import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import LoadingSpinner from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, profile, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but on login/signup pages, redirect to dashboard
  if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
    if (profile?.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (profile?.role === 'teacher') {
      return <Navigate to="/teacher-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;