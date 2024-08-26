import React from 'react';
import { useLocation } from 'react-router-dom';
import Orders from '../forms/OrderForm';
import Products from './Products';
import MyOrders from './MyOrders';
import HomePage from './HomePage';

const Home = () => {
  const location = useLocation();
  const email = location.state?.email; 

  const renderContent = () => {
    switch (location.pathname) {
      case '/home/my-orders':
        return <MyOrders />;
      case '/home/products':
        return <Products />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-start bg-white relative">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-red-600"></div>

      <div className="relative mt-8 bg-white shadow-lg rounded-lg w-4/5 h-[700px] overflow-auto custom-scrollbar overflow-y-scroll z-10">
        {renderContent()}
      </div>

    </div>
  );
};

export default Home;
