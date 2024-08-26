import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Orders = ({ product, onClose }) => {
  const { authToken, user } = useContext(AuthContext); // Use authToken from context
  console.log('Retrieved Token:', authToken); // Log token to ensure it's being sent

  const [orderDetails, setOrderDetails] = useState({
    customer_name: user?.username || 'Guest',
    delivery_address: '',
    total_price: product.price || 0,
    status: 'Pending',
    delivery_time: '',
    special_instructions: '',
    delivery_fee: 0,
    quantity: 1, 
    product_id: product?.id || 0,
  });

  useEffect(() => {
    if (product) {
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        total_price: product.price * (prevDetails.quantity || 1),
      }));
    }
  }, [product, orderDetails.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async () => {
    try {
      console.log('Order Details:', orderDetails);
      console.log('Token:', authToken); // Log token to ensure it's being sent

      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Use authToken from context
        },
        body: JSON.stringify({
          ...orderDetails,
          items: [{
            product_id: orderDetails.product_id,
            quantity: orderDetails.quantity,
            price: product.price,
            total_price: orderDetails.total_price,
          }],
        }),
      });

      if (response.ok) {
        alert('Order submitted successfully!');
        onClose();
      } else {
        console.error('Error submitting order:', await response.text());
        alert('Error submitting order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-2/4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="bg-orange-100 text-orange-600 font-bold p-2 rounded-md">Product Details</h2>
            <div className="mt-4">
              <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-2 text-gray-800 font-bold">Price: ${product.price}</p>
            </div>
          </div>

          {/* Order Form Section */}
          <div>
            <h2 className="bg-orange-100 text-orange-600 font-bold p-2 rounded-md">Order Information</h2>
            <div className="mt-4">
              <label className="block text-sm font-medium">Customer Name:</label>
              <input
                name="customer_name"
                className="w-full border rounded p-2 mt-1"
                type="text"
                value={orderDetails.customer_name}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Delivery Address:</label>
              <input
                name="delivery_address"
                className="w-full border rounded p-2 mt-1"
                type="text"
                value={orderDetails.delivery_address}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Quantity:</label>
              <input
                name="quantity"
                className="w-full border rounded p-2 mt-1"
                type="number"
                min="1"
                value={orderDetails.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Total Price (€):</label>
              <input
                name="total_price"
                className="w-full border rounded p-2 mt-1"
                type="number"
                value={orderDetails.total_price}
                readOnly // Total price is calculated and should be read-only
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Delivery Time:</label>
              <input
                name="delivery_time"
                className="w-full border rounded p-2 mt-1"
                type="datetime-local"
                value={orderDetails.delivery_time}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Order Status:</label>
              <select
                name="status"
                className="w-full border rounded p-2 mt-1"
                value={orderDetails.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md"
            onClick={handleOrderSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
