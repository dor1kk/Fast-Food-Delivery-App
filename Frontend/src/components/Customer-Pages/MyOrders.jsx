import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import { FaEdit, FaTrash, FaCreditCard } from 'react-icons/fa'; // Import icons from react-icons
import Payments from '../forms/PaymentForm';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order for payment
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

  const handleMakePayment = (order) => {
    setSelectedOrder(order); // Set the selected order when the button is clicked
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  const handleEdit = (id) => {
    console.log('Edit order with ID:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete order with ID:', id);
    // Add your delete logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b border-gray-300 text-left">Image</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Order Date</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Total Price</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Delivery Address</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">
                <img src={order.image_url} className='h-16 w-16' alt="Order" />
              </td>
              <td className="px-4 py-2 border-b border-gray-300">{order.name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{new Date(order.order_date).toLocaleString()}</td>
              <td className="px-4 py-2 border-b border-gray-300">${order.total_price}</td>
              <td className="px-4 py-2 border-b border-gray-300">{order.delivery_address}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="p-2 bg-gray-300 text-white rounded hover:bg-red-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-2 bg-gray-300 text-white rounded hover:bg-red-700">
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleMakePayment(order)}
                    className="p-2 bg-gray-300 text-white rounded hover:bg-red-700">
                    <FaCreditCard />
                  </button>
                </div>
              </td>
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
