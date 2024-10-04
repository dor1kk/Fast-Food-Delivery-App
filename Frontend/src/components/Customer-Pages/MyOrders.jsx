import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import { FaEdit, FaTrash, FaCreditCard, FaSearch, FaChevronDown } from 'react-icons/fa'; 
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
        .then(response => {
          console.log('Payment successful:', response);
          setOrders(prevOrders => 
            prevOrders.map(order =>
              order.id === ordersToPay[0].id ? { ...order, status: 'Delivered' } : order
            )
          );
        })
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

  const [expandedOrder, setExpandedOrder] = useState(null);

  // Filter orders into active (unpaid) and completed (paid)
  const activeOrders = filteredOrders.filter(order => order.status === 'Pending');
  const completedOrders = filteredOrders.filter(order => order.status === 'Delivered');

  console.log("complete orders", completedOrders);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Search Input */}
        <div className="mb-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleEdit}
            disabled={selectedOrders.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedOrders.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            <FaTrash /> Delete
          </button>
          <button
            onClick={handleMakePayment}
            disabled={selectedOrders.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            <FaCreditCard /> Make Payment
          </button>
        </div>

    {/* Active Orders */}
<h2 className="text-xl font-bold mb-4">Active Orders</h2>
<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
  {activeOrders.length > 0 ? (  // Check if there are active orders
    activeOrders.map(order => (
      <div key={order.id} className="border-b border-gray-200 last:border-b-0">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedOrders.includes(order.id)}
              onChange={() => handleSelectOrder(order.id)}
              onClick={(e) => e.stopPropagation()} // Prevent checkbox click from triggering the row click
              className="h-5 w-5 text-blue-600"
            />
            <img src={order.image_url} className="h-16 w-16 object-cover rounded-md" alt="Order" />
            <div>
              <h3 className="font-semibold text-gray-800">{order.name}</h3>
              <p className="text-sm text-gray-500">{new Date(order.order_date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-bold text-green-600">${order.total_price}</span>
            <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedOrder === order.id ? 'transform rotate-180' : ''}`} />
          </div>
        </div>
        {expandedOrder === order.id && (
          <div className="p-4 bg-gray-50">
            <p className="text-gray-700"><span className="font-semibold">Delivery Address:</span> {order.delivery_address}</p>
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500 p-4">No active orders found.</p> // Updated message for active orders
  )}
</div>


        <h2 className="text-xl font-bold mb-4">Order History</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <div key={order.id} className="border-b border-gray-200 last:border-b-0">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center space-x-4">
                    <img src={order.image_url} className="h-16 w-16 object-cover rounded-md" alt="Order" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{order.name}</h3>
                      <p className="text-sm text-gray-500">{new Date(order.order_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-green-600">${order.total_price}</span>
                    <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedOrder === order.id ? 'transform rotate-180' : ''}`} />
                  </div>
                </div>
                {expandedOrder === order.id && (
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-700"><span className="font-semibold">Delivery Address:</span> {order.delivery_address}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-4">No completed orders found.</p>
          )}
        </div>
        
      </div>

      {selectedOrder && (
        <Payments order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyOrders;
