import React from 'react';
import { useLocation } from 'react-router-dom';
import Orders from './Order';
import Products from './Products';

const Home = () => {
  const location = useLocation();
  const email = location.state?.email; 

  const renderContent = () => {
    switch (location.pathname) {
      case '/home/orders':
        return <Orders />;
      case '/home/products':
        return <Products />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white relative">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-red-600"></div>

      <div className="relative mt-8 bg-white shadow-lg rounded-lg w-4/5 h-[600px] overflow-auto hide-scrollbar z-10">
        {renderContent()}
      </div>

    </div>
  );
};

export default Home;
