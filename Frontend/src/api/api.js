import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Change this to your backend URL

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
