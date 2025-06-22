import axios from 'axios';

const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_BACKEND_URL;

const API = axios.create({
  baseURL,
  withCredentials: true
});

export default API;
