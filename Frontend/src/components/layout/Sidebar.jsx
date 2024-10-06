import React from 'react';
import { FaBoxOpen, FaChartBar, FaShoppingCart, FaSignOutAlt, FaThList, FaUsers, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-red-500 border-r dark:bg-gray-900 dark:border-gray-700"> {/* Fixed position */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 space-y-3">
          <div className="relative mx-3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>

            <input 
              type="text" 
              className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
              placeholder="Search" 
            />
          </div>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/dashboard">
            <FaThList className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Dashboard</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/customers">
            <FaUsers className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Manage Customers</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/drivers">
            <FaUserTie className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Manage Drivers</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/products">
            <FaBoxOpen className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Products</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/categories">
            <FaThList className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Categories</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/orders">
            <FaShoppingCart className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">All Orders</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/admin/analytics">
            <FaChartBar className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Analytics</span>
          </Link>

          <Link className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-red-400" to="/settings">
            <FaSignOutAlt className="w-5 h-5 text-white" />
            <span className="mx-2 font-medium">Sign out</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
