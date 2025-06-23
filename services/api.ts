import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });