
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-white dark:bg-gray-900 shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link 
            to="/" 
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            About
          </Link>
          <Link 
            to="/login" 
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="block px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-center font-medium"
            onClick={onClose}
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
