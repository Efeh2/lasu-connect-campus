import React from 'react';
import { LogOut } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

const LogoutButton = () => {
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500"
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};

export default LogoutButton;