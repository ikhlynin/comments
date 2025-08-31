import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL?.replace(/^"|"$/g, ""),
  withCredentials: true,
});

console.log("ENV: ", process.env.REACT_APP_API_URL);
console.log("Base URL:", api.defaults.baseURL);

export default api;
