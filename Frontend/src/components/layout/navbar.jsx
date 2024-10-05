import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout(); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderLinks = (role) => {
    const links = role === 'customer' 
      ? [
          { to: "/home", text: "Home" },
          { to: "/home/products", text: "Products" },
          { to: "/home/my-orders", text: "My Orders" },
     
          { to: "/home/payments-history", text: "Payments" },
          { to: "/home/favorites", text: "Favorites" },
        ]
      : [
          { to: "/home/driver-dashboard", text: "Dashboard" },
          { to: "/home/active-deliveries", text: "Active Deliveries" },
          { to: "/home/completed-deliveries", text: "Completed Deliveries" },
          { to: "/home/map", text: "Map" },

        ];

    return links.map((link, index) => (
      <Link 
        key={index} 
        to={link.to} 
        className="block px-4 py-2 text-white hover:bg-red-700 lg:inline-block lg:hover:bg-transparent"
        onClick={() => setMobileMenuOpen(false)}
      >
        {link.text}
      </Link>
    ));
  };

  return (
    <header className=" w-full bg-red-600 p-4 flex flex-wrap justify-between items-center">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-lg font-bold">Delivery</h1>
        
        {/* Hamburger menu for mobile */}
        <button
          className="lg:hidden text-white"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center space-x-4">
          {user ? renderLinks(user.role) : (
            <Link to="/login" className="text-white px-4 py-2">Login</Link>
          )}
        </nav>

        {user && (
          <div className="hidden lg:flex items-center ml-4">
            <p className="text-white px-4 py-2">{user.email}</p>
            <div className="relative">
              <button 
                className="text-white px-4 py-2"
                onClick={toggleDropdown}
              >
                ▼
              </button>
              <div 
                className={`absolute right-0 mt-2 bg-white text-black w-[220px] rounded shadow-lg ${dropdownOpen ? 'block' : 'hidden'}`}
              >
                <Link to="/home/profile" className="block px-4 py-2 hover:bg-gray-200">Profile Settings</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <nav className={`w-full lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'} mt-4`}>
        {user ? (
          <>
            {renderLinks(user.role)}
            <Link to="/home/profile" className="block px-4 py-2 text-white hover:bg-red-700" onClick={() => setMobileMenuOpen(false)}>Profile Settings</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-red-700">Logout</button>
          </>
        ) : (
          <Link to="/login" className="block px-4 py-2 text-white hover:bg-red-700" onClick={() => setMobileMenuOpen(false)}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
