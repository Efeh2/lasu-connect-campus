
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
              alt="LASU Logo" 
              className="h-8 w-8 mr-3"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">TSI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              About
            </Link>
            <ThemeToggle />
            <Link 
              to="/login" 
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/login" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors mx-3 text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
