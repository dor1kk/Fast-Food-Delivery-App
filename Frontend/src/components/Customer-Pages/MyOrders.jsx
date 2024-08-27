import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import { FaEdit, FaTrash, FaCreditCard, FaSearch } from 'react-icons/fa'; // Import icons from react-icons
import Payments from '../forms/PaymentForm';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]); // State to hold selected orders
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order for payment
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:8080/orders/customer-orders', {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('Expected an array of orders, but got:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
    });
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
      setSelectedOrder(ordersToPay[0]); // Set the first selected order for payment
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  const handleEdit = () => {
    console.log('Edit orders with IDs:', selectedOrders);
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log('Delete orders with IDs:', selectedOrders);
    // Add your delete logic here
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
