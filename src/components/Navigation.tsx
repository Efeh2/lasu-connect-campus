
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                alt="LASU Logo" 
                className="h-10 w-10"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-purple-900">TSI</h1>
                <p className="text-xs text-gray-600">Teacher-Student Interaction System</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-purple-900">TSI</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </Link>
            <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Login
            </Link>
            <Link to="/signup" className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link to="/about" className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-base font-medium">
                About
              </Link>
              <Link to="/login" className="block bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-base font-medium mx-3 my-2 text-center">
                Login
              </Link>
              <Link to="/signup" className="block border border-purple-600 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium mx-3 my-2 text-center">
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
