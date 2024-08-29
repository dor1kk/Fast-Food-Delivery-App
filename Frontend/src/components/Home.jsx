import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; // Import the library styles
import Orders from './forms/OrderForm';
import Products from './Customer-Pages/Products';
import MyOrders from './Customer-Pages/MyOrders';
import HomePage from './Customer-Pages/HomePage';
import Payments from './forms/PaymentForm';
import Wishlist from './Customer-Pages/Wishlist';
import PaymentHistory from './Customer-Pages/PaymentHistory';
import { AuthContext } from '../context/authContext'; // Import AuthContext
import Dashboard from './Driver-Pages/DriverDashboard';
import ActiveDeliveries from './Driver-Pages/ActiveDeliveries';
import CompletedDeliveries from './Driver-Pages/CompletedDeliveries';
import Profile from './Customer-Pages/Profile';

const Home = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const location = useLocation();
  const email = location.state?.email;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Log the user role to console
  console.log('User role:', user?.role);

  // Define role-based content rendering
  const renderContent = () => {
    if (!user) {
      return <HomePage />; // Default to HomePage if no user info is available
    }

    switch (user.role) {
      case 'customer':
        switch (location.pathname) {
          case '/home/my-orders':
            return <MyOrders />;
          case '/home/products':
            return <Products />;
          case '/home/payments-history':
            return <PaymentHistory />;
          case '/home/wishlist':
            return <Wishlist />;
          case '/home/profile':
            return <Profile />;
          default:
            return <HomePage />;
        }
      case 'driver':
        switch (location.pathname) {
          case '/home/driver-dashboard':
            return <Dashboard />;
          case '/home/active-deliveries':
            return <ActiveDeliveries />;
          case '/home/completed-deliveries':
            return <CompletedDeliveries />;
          default:
            return <HomePage />;
        }
      default:
        return <HomePage />;
    }
  };

  const content = renderContent();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="hidden sm:block w-full h-[150px] bg-red-500"></div>

      <div className="flex-grow  sm:px-6 md:px-8 p-4 sm:-mt-24 md:-mt-32">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {isMobile ? (
            <div className="max-h-[calc(100vh-20px)] overflow-y-auto">
              {content}
            </div>
          ) : (
            <PerfectScrollbar className="max-h-[calc(100vh-120px)]">
              {content}
            </PerfectScrollbar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
