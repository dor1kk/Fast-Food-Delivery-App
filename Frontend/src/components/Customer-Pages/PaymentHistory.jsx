import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import { FaCreditCard, FaSearch } from 'react-icons/fa'; // Import icons from react-icons

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]); // State to hold selected payments
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:8080/payments/payment-history', {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setPayments(response.data);
      } else {
        console.error('Expected an array of payments, but got:', response.data);
      }
    })
    .catch(error => {
      setError('Error fetching payment history');
      console.error('Error fetching payments:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [authToken]);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6">{error}</p>;

  const getPaymentMethodImage = (label) => {
    const paymentMethods = [
      { id: 'credit-card', label: 'Credit Card', image: 'https://cdn-icons-png.flaticon.com/512/6963/6963703.png' },
      { id: 'debit-card', label: 'Debit Card', image: 'https://cdn-icons-png.flaticon.com/512/9361/9361196.png' },
      { id: 'paypal', label: 'PayPal', image: 'https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Paypal-icon.png' },
      { id: 'cash', label: 'Cash', image: 'https://cdn-icons-png.flaticon.com/512/5571/5571272.png' },
    ];

    const method = paymentMethods.find(method => method.label === label);
    return method ? method.image : '';
  };

  const filteredPayments = payments.filter(payment =>
    String(payment.id).includes(searchQuery.toLowerCase()) ||
    String(payment.status).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments(prevSelectedPayments => 
      prevSelectedPayments.includes(paymentId)
        ? prevSelectedPayments.filter(id => id !== paymentId)
        : [...prevSelectedPayments, paymentId]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-3 bg-white flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => console.log('View details for selected payments:', selectedPayments)}
            disabled={selectedPayments.length === 0}
            className="flex items-center gap-2 p-2  text-red-600 rounded hover:bg-gray-400"
          >
            <FaCreditCard /> View Details
          </button>
        </div>
        <div className="flex items-center border border-gray-300 rounded p-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 p-1 outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto p-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (selectedPayments.length === payments.length) {
                      setSelectedPayments([]);
                    } else {
                      setSelectedPayments(payments.map(payment => payment.id));
                    }
                  }}
                  checked={selectedPayments.length === payments.length}
                />
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Payment Method</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Order ID</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Payment Date</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Amount</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Status</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(payment.id)}
                    onChange={() => handleSelectPayment(payment.id)}
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <img
                    src={getPaymentMethodImage(payment.payment_method)}
                    alt={payment.payment_method}
                    className="w-8 h-8"
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-300">{payment.order_id}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(payment.payment_date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-300">${payment.amount}</td>
                <td className="px-4 py-2 border-b border-gray-300">{payment.status}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => console.log('View details for payment ID:', payment.id)}
                    className="p-2 bg-gray-300 text-white rounded hover:bg-gray-400"
                  >
                    <FaCreditCard />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
