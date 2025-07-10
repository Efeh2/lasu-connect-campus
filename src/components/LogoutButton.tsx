
import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  className?: string;
  variant?: 'button' | 'link';
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className = '', variant = 'button' }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  if (variant === 'link') {
    return (
      <button
        onClick={handleLogout}
        className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors ${className}`}
      >
        <LogOut size={16} className="mr-2" />
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors ${className}`}
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </button>
  );
};

export default LogoutButton;
