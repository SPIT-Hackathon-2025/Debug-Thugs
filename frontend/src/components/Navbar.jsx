import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MetamaskLogin from './MetamaskLogin';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-800">Tor-Rent</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/')} hover:text-blue-500 transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`${isActive('/about')} hover:text-blue-500 transition-colors`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact')} hover:text-blue-500 transition-colors`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center">
            <MetamaskLogin />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 