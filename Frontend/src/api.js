import axios from 'axios';

// This checks if Vercel has a variable set. If not, it uses your Render URL.
const API_URL = import.meta.env.VITE_API_URL || "https://ventor.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
