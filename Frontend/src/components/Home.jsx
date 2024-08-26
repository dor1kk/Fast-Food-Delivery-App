import React, { useContext } from 'react';
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

const Home = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const location = useLocation();
  const email = location.state?.email;

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

  return (
    <div className="h-[90vh] flex flex-col items-center justify-start bg-white relative">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-red-600"></div>

      <div className="relative mt-8 bg-white shadow-lg rounded-lg w-4/5 h-[700px] overflow-hidden z-10">
        <PerfectScrollbar>
          {renderContent()}
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Home;
