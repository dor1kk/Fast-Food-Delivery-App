import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {

  const location = useLocation();
  const email = location.state?.email;
  
  

  return (
    <header className="w-full bg-red-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">Delivery</h1>
      <div className="flex items-center">
        <Link to="/home" className="text-white px-4 py-2">Home</Link>
        <Link to="orders" className="text-white px-4 py-2">Orders</Link>
        <Link to="products" className="text-white px-4 py-2">Products</Link>
      </div>
      <div className="">
      {email && <p className="absolute top-4 right-4 text-white">{email}</p>}
      </div>
    </header>
  );
};

export default Navbar;
