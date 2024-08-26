import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data.token;
  } catch (err) {
    console.error('Login failed:', err);
    return null;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Fetching profile failed:', err);
    return null;
  }
};


