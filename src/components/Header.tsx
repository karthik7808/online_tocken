import React, { useState } from 'react';
import { Menu, X, User, CalendarDays, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <CalendarDays className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">QueueEase</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-base font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 transition-colors'}`}
            >
              Home
            </Link>
            <Link 
              to="/institutions" 
              className={`text-base font-medium ${isActive('/institutions') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 transition-colors'}`}
            >
              Institutions
            </Link>
            <Link 
              to="/appointments" 
              className={`text-base font-medium ${isActive('/appointments') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 transition-colors'}`}
            >
              My Appointments
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-base font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 transition-colors'}`}
            >
              Dashboard
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/profile" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2 border-t mt-4 animate-fadeIn">
            <Link 
              to="/" 
              className={`block py-2 ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/institutions" 
              className={`block py-2 ${isActive('/institutions') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Institutions
            </Link>
            <Link 
              to="/appointments" 
              className={`block py-2 ${isActive('/appointments') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Appointments
            </Link>
            <Link 
              to="/dashboard" 
              className={`block py-2 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`block py-2 ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <button className="block py-2 w-full text-left text-gray-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;