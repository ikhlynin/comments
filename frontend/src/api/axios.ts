import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://backend-production-7295.up.railway.app",
  withCredentials: true,
});

export default api;
