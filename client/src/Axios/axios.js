import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export default instance;
