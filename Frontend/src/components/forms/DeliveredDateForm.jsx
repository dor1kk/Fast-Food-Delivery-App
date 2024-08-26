// DeliveryModal.js
import React, { useState } from 'react';

const DeliveryModal = ({ isOpen, onClose, onSave, delivery, setDeliveredTime }) => {
  const [status, setStatus] = useState(delivery.delivery_status);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(delivery, status);
    setStatus(delivery.delivery_status); // Reset status after saving
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
            ×
          </button>
          <h2 className="text-lg font-bold mb-4">Update Delivery</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="delivered-time">Delivered Time:</label>
            <input
              type="datetime-local"
              id="delivered-time"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setDeliveredTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Assigned">Assigned</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryModal;
