import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; 
import Products from './Customer-Pages/Products';
import MyOrders from './Customer-Pages/MyOrders';
import HomePage from './Customer-Pages/HomePage';
import PaymentHistory from './Customer-Pages/PaymentHistory';
import { AuthContext } from '../context/authContext'; 
import Dashboard from './Driver-Pages/DriverDashboard';
import ActiveDeliveries from './Driver-Pages/ActiveDeliveries';
import CompletedDeliveries from './Driver-Pages/CompletedDeliveries';
import Profile from './Customer-Pages/Profile';
import Favorites from './Customer-Pages/Favorites';

const Home = () => {
  const { user } = useContext(AuthContext); 
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

  console.log('User role:', user?.role);

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
          case '/home/favorites':
            return <Favorites />;
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
    <div className="h-screen flex flex-col"> 
      <div className="flex-grow p-0"> 
        <div className="overflow-hidden h-full">
          {isMobile ? (
            <div className="h-full overflow-y-auto"> 
              {content}
            </div>
          ) : (
            <PerfectScrollbar className="h-full"> 
              {content}
            </PerfectScrollbar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
