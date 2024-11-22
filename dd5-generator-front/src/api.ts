import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
  timeout: 10000, // Request timeout
});

export default api;
