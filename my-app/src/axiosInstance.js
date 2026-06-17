import axios from 'axios';

// Create an Axios instance that uses your environment variable
// If REACT_APP_API_URL is not set, it will fallback to your local backend for testing
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5500',
});

export default axiosInstance;
