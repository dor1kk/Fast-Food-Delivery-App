import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, message } from 'antd'; // Ant Design components
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { AuthContext } from '../../context/authContext';
import { fetchAllOrders } from '../../api/OrdersApi';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalOrders, setTotalOrders] = useState(0); 
  const ordersPerPage = 5; 

  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchAllOrders(authToken);
        setOrders(fetchedOrders);
        setTotalOrders(fetchedOrders.length); // Update total orders count
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [authToken]);

  // Function to get the orders for the current page
  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return orders.slice(startIndex, endIndex);
  };

  // Function to delete an order
  const handleDelete = (orderId) => {
    message.info(`Deleting order with ID: ${orderId}`);
    // Add functionality to delete the order via API
  };

  // Function to edit an order (navigate to order edit form)
  const handleEdit = (orderId) => {
    message.info(`Editing order with ID: ${orderId}`);
    // Add functionality to edit the order via API or navigate to edit form
  };

  // Table columns for Ant Design
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Total',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (text) => `$${text}`, // Display total price with dollar sign
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            type="button"
            className="bg-red-500 text-white mr-2"
            icon={<FaEdit />}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<FaTrashAlt />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Orders Management</h1>

      {/* Ant Design Table with built-in Pagination */}
      <Table
        columns={columns}
        dataSource={getPaginatedOrders()} 
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: ordersPerPage,
          total: totalOrders,
          onChange: (page) => setCurrentPage(page), // Change page on pagination click
        }}
      />
    </div>
  );
};

export default ManageOrders;
