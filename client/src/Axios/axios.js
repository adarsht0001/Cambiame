import axios from 'axios';

// const baseURL = '/api';
// const baseURL = 'http://localhost:5000/api';
const baseURL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export default instance;
