import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import { FaCreditCard, FaSearch, FaFilter, FaChevronDown, FaEye } from 'react-icons/fa';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authToken } = useContext(AuthContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateSort, setDateSort] = useState('desc');

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

  const filteredPayments = payments
    .filter(payment => 
      (statusFilter === 'all' || payment.status.toLowerCase() === statusFilter) &&
      (String(payment.id).includes(searchQuery.toLowerCase()) ||
       String(payment.status).toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.payment_date);
      const dateB = new Date(b.payment_date);
      return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments(prevSelectedPayments => 
      prevSelectedPayments.includes(paymentId)
        ? prevSelectedPayments.filter(id => id !== paymentId)
        : [...prevSelectedPayments, paymentId]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">

        <div className="bg-gray-50 rounded-lg  p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative mb-4 md:mb-0 md:w-1/3">
              <input
                type="text"
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
         
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

         
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Filter by Status:</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'completed', 'pending', 'failed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusFilter === status
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          

          {/* Payments list */}
          <div className="space-y-4">
            {filteredPayments.map(payment => (
              <div key={payment.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={getPaymentMethodImage(payment.payment_method)}
                      alt={payment.payment_method}
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{payment.order_id}</p>
                      <p className="text-sm text-gray-500">{new Date(payment.payment_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">${payment.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
