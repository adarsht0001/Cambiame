// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

const accessToken = localStorage.getItem('access_token');
instance.defaults.headers.Authorization = `Bearer ${accessToken}`;

export default instance;
