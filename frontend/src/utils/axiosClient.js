import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://nexai-bkto.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
