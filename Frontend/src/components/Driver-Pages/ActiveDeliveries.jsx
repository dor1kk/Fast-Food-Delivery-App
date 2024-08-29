import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import DeliveryModal from '../forms/DeliveredDateForm';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaCheckCircle, FaTruck, FaSearch, FaPrint, FaFileInvoice } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';

const ActiveDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveredTime, setDeliveredTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { authToken } = useContext(AuthContext);

  // Bill modal state
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedBillDelivery, setSelectedBillDelivery] = useState(null);
  const billRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  useEffect(() => {
    fetchAllDeliveries();
  }, [authToken]);

  const fetchAllDeliveries = async () => {
    try {
      const activeResponse = await fetch('http://localhost:8080/deliveries/active-deliveries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const completedResponse = await fetch('http://localhost:8080/deliveries/completed-deliveries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (!activeResponse.ok || !completedResponse.ok) {
        throw new Error('Network response was not ok');
      }
      
      const activeData = await activeResponse.json();
      const completedData = await completedResponse.json();
      
      setDeliveries([...activeData, ...completedData]);
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
    }
  };

  const openModal = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeliveredTime('');
    setSelectedDelivery(null);
  };

  const openBillModal = (delivery) => {
    setSelectedBillDelivery(delivery);
    setShowBillModal(true);
  };

  const closeBillModal = () => {
    setShowBillModal(false);
    setSelectedBillDelivery(null);
  };

  const filteredDeliveries = deliveries.filter(delivery => 
    (delivery.order_id.toString().includes(searchQuery) ||
     delivery.delivery_status.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterStatus === 'all' || delivery.delivery_status.toLowerCase() === filterStatus)
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search deliveries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            {['all', 'assigned', 'in progress', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterStatus === status
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition duration-300`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {filteredDeliveries.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 mt-8"
            >
              No deliveries found.
            </motion.p>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredDeliveries.map((delivery) => (
                <DeliveryCard 
                  key={delivery.order_id} 
                  delivery={delivery} 
                  openModal={openModal} 
                  openBillModal={openBillModal} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedDelivery && (
        <DeliveryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          delivery={selectedDelivery}
        />
      )}

      {showBillModal && selectedBillDelivery && (
        <BillModal
          delivery={selectedBillDelivery}
          onClose={closeBillModal}
          onPrint={handlePrint}
          ref={billRef}
        />
      )}
    </div>
  );
};

const DeliveryCard = ({ delivery, openModal, openBillModal }) => {
  const statusColors = {
    assigned: 'bg-yellow-100 text-yellow-800',
    'in progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.03 }}
      layout
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-500">Order #{delivery.order_id}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[delivery.delivery_status.toLowerCase()]}`}>
            {delivery.delivery_status}
          </span>
        </div>
        <div className="space-y-2">
          <InfoItem icon={<FaMapMarkerAlt />} text={delivery.delivery_address || "Address not available"} />
          <InfoItem icon={<FaClock />} text={new Date(delivery.assigned_time).toLocaleString()} />
          <InfoItem icon={<FaDollarSign />} text={`$${delivery.total_price}`} />
          {delivery.delivery_status === 'completed' && (
            <InfoItem icon={<FaCheckCircle />} text={`Completed: ${new Date(delivery.delivered_time).toLocaleString()}`} />
          )}
        </div>
        <div className="mt-4 flex justify-between">
          {delivery.delivery_status === 'Assigned' && (
            <button
              onClick={() => openBillModal(delivery)}
              className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300 flex items-center"
            >
              <FaFileInvoice className="mr-2" />
              Bill
            </button>
          )}
          {delivery.delivery_status !== 'Completed' && (
            <button
              onClick={() => openModal(delivery)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
            >
              <FaTruck className="mr-2" />
              Update Status
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BillModal = React.forwardRef(({ delivery, onClose, onPrint }, ref) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-lg">
        <div ref={ref}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Invoice</h2>
            <p className="text-gray-600">Order #{delivery.order_id}</p>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="border-b border-gray-300 mb-4 pb-4">
            <h4 className="font-semibold">Delivery Details</h4>
            <p><strong>Address:</strong> {delivery.delivery_address || "Address not available"}</p>
            <p><strong>Assigned Time:</strong> {new Date(delivery.assigned_time).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Order Summary</h4>
            <div className="flex justify-between">
              <span>Item 1</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span>Item 2</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between">
              <span>Item 3</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>${delivery.total_price}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Thank you for your business!</p>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onPrint}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            <FaPrint className="mr-2" />
            Print
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center text-gray-600">
    <span className="mr-2">{icon}</span>
    <span>{text}</span>
  </div>
);

export default ActiveDeliveries;
