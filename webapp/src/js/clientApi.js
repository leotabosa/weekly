import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Accent-Encoding": "gzip, deflate",
  },
});

export default api;
