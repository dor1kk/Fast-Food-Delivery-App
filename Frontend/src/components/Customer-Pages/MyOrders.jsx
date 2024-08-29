import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import { FaEdit, FaTrash, FaCreditCard, FaSearch } from 'react-icons/fa'; 
import Payments from '../forms/PaymentForm';
import { fetchOrders, makePayment } from '../../api/OrdersApi';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders(authToken)
      .then(setOrders)
      .catch(error => console.error('Failed to fetch orders:', error));
  }, [authToken]);
  

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prevSelectedOrders => 
      prevSelectedOrders.includes(orderId)
        ? prevSelectedOrders.filter(id => id !== orderId)
        : [...prevSelectedOrders, orderId]
    );
  };

  const handleMakePayment = () => {
    const ordersToPay = orders.filter(order => selectedOrders.includes(order.id));
    if (ordersToPay.length > 0) {
      setSelectedOrder(ordersToPay[0]); 
      makePayment(ordersToPay[0].id, authToken)
        .then(response => console.log('Payment successful:', response))
        .catch(error => console.error('Payment failed:', error));
    }
  };
  
  

  const handleCloseModal = () => {
    setSelectedOrder(null); 
  };

  const handleEdit = () => {
    console.log('Edit orders with IDs:', selectedOrders);
    //TODO edit logic
  };

  const handleDelete = () => {
    console.log('Delete orders with IDs:', selectedOrders);
    //TODO delete logic
  };

  const filteredOrders = orders.filter(order => 
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.delivery_address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="p-3 bg-white flex justify-between items-center">
        <div className="flex space-x-4">
        <button
            onClick={handleEdit}
            disabled={selectedOrders.length === 0}
            className="flex flex-row gap-1 justify-center items-center  text-red-500 rounded "
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedOrders.length === 0}
            className="flex flex-row gap-1 justify-center items-center  text-red-500 rounded "
          >
            <FaTrash /> Delete
          </button>
          <button
            onClick={handleMakePayment}
            disabled={selectedOrders.length === 0}
            className="flex flex-row gap-1 justify-center items-center  text-red-500 rounded "
          >
            <FaCreditCard /> Make Payment
          </button>
        </div>
        <div className="flex items-center border border-gray-300 rounded p-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 p-1 outline-none"
          />
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b border-gray-300 text-left">
              <input
                type="checkbox"
                onChange={() => {
                  if (selectedOrders.length === orders.length) {
                    setSelectedOrders([]);
                  } else {
                    setSelectedOrders(orders.map(order => order.id));
                  }
                }}
                checked={selectedOrders.length === orders.length}
              />
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Image</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Order Date</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Total Price</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Delivery Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => handleSelectOrder(order.id)}
                />
              </td>
              <td className="px-4 py-2 border-b border-gray-300">
                <img src={order.image_url} className='h-16 w-16' alt="Order" />
              </td>
              <td className="px-4 py-2 border-b border-gray-300">{order.name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{new Date(order.order_date).toLocaleString()}</td>
              <td className="px-4 py-2 border-b border-gray-300">${order.total_price}</td>
              <td className="px-4 py-2 border-b border-gray-300">{order.delivery_address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <Payments
          order={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MyOrders;
