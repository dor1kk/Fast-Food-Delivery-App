import axios from 'axios';

// Base URL
const API_BASE_URL = 'http://localhost:8080';

// Register Function
export const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, { email, password, username });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login Function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};