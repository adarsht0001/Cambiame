import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? '/api'
  : '/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export default instance;
