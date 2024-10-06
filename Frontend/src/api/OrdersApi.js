import axios from 'axios';

// Base URL
const API_BASE_URL = 'http://localhost:8080';



//Make an order post api
export const submitOrder = async (orderDetails, authToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, {
      ...orderDetails,
      items: [{
        product_id: orderDetails.product_id,
        quantity: orderDetails.quantity,
        price: orderDetails.total_price / orderDetails.quantity, 
        total_price: orderDetails.total_price,
      }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};



export const fetchOrders = async (authToken) => {
  try {
    const response = await axios.get('http://localhost:8080/orders/customer-orders', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Expected an array of orders, but got:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    if (error.response) {
      console.error('Response error:', error.response.data);
    }
    throw error;
  }
};


export const fetchAllOrders = async (authToken) => {
  try {
    const response = await axios.get('http://localhost:8080/orders/all-orders', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Expected an array of orders, but got:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    if (error.response) {
      console.error('Response error:', error.response.data);
    }
    throw error;
  }
};



export const makePayment = async (orderId, authToken) => {
  try {
    const response = await axios.post(`http://localhost:8080/orders/${orderId}/pay`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    if (error.response) {
      console.error('Response error:', error.response.data);
    }
    throw error;
  }
};

export const editOrder = async (orderId, updatedData, authToken) => {
  try {
    const response = await axios.put(`http://localhost:8080/orders/${orderId}`, updatedData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing order:', error);
    if (error.response) {
      console.error('Response error:', error.response.data);
    }
    throw error;
  }
};

export const deleteOrder = async (orderId, authToken) => {
  try {
    const response = await axios.delete(`http://localhost:8080/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    if (error.response) {
      console.error('Response error:', error.response.data);
    }
    throw error;
  }
};
