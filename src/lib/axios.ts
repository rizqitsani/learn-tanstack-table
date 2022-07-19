import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
