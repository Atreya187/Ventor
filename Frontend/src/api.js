import axios from 'axios';

// This checks if Vercel has a variable set. If not, it uses your Render URL.
// Inside Frontend/api.js
// Remove the 'import.meta.env' logic entirely
const API_URL = ""; 

const api = axios.create({
  baseURL: API_URL,
});

export default api;

