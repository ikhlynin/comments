import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://backend-production-7295.up.railway.app:5000",
  withCredentials: true,
});

export default api;
