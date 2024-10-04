import React, { useState, useEffect } from 'react';

const PaymentForm = ({ order, onClose }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    paymentMethod: 'Credit Card', 
    amount: '',
    status: 'Pending',
  });

  console.log("order", order);

  useEffect(() => {
    if (order) {
      const { order_id, total_price } = order;
      setFormData({
        ...formData,
        orderId: order_id,
        amount: total_price,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMethodClick = (methodId) => {
    // Map methodId to database value
    const methodMapping = {
      'credit-card': 'Credit Card',
      'debit-card': 'Debit Card',
      'paypal': 'PayPal',
      'cash': 'Cash'
    };
    setFormData({
      ...formData,
      paymentMethod: methodMapping[methodId] || 'Credit Card',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/payments/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Payment saved successfully!');
        onClose(); 
      } else {
        alert('Failed to save payment. Please try again.');
      }
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Make Payment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:flex-row md:gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Product ID:</label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
       
          <div className='flex flex-col'>
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Method:</label>
                <div className="flex flex-wrap gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex flex-row justify-center items-center space-x-2 p-2 bg-gray-50 border rounded-lg cursor-pointer ${formData.paymentMethod === method.label ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500`}
                      onClick={() => handleMethodClick(method.id)}
                    >
                      <img src={method.image} alt={method.label} className="h-6 w-6" />
                      <p className="text-sm font-medium">{method.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                Submit Payment
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-white text-sm rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const paymentMethods = [
  { id: 'credit-card', label: 'Credit Card', image: 'https://cdn-icons-png.flaticon.com/512/6963/6963703.png' },
  { id: 'debit-card', label: 'Debit Card', image: 'https://cdn-icons-png.flaticon.com/512/9361/9361196.png' },
  { id: 'paypal', label: 'PayPal', image: 'https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Paypal-icon.png' },
  { id: 'cash', label: 'Cash', image: 'https://cdn-icons-png.flaticon.com/512/5571/5571272.png' },
];

export default PaymentForm;
