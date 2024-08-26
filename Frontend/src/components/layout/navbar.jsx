import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const email = location.state?.email;

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="w-full bg-red-600 p-4 flex justify-between items-center relative">
      <h1 className="text-white text-lg font-bold">Delivery</h1>
      <div className="flex items-center">
        <Link to="/home" className="text-white px-4 py-2">Home</Link>
        <Link to="my-orders" className="text-white px-4 py-2">Orders</Link>
        <Link to="products" className="text-white px-4 py-2">Products</Link>
        <Link to="payments" className="text-white px-4 py-2">Payments</Link>
        <Link to="payments" className="text-white px-4 py-2">Wishlist</Link>


      </div>
      <div className="relative">
        {user ? (
          <div className="flex items-center">
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
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile Settings</Link>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-white px-4 py-2">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
