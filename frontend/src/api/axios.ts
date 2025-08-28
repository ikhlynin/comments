import axios from "axios";

const api = axios.create({
  baseURL: process.env.CLIENT_API || 'http://localhost:3001/api',
  withCredentials: true,
});

export default api;
