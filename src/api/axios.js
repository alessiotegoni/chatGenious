import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:5000"
    : "https://chatgenious-api.onrender.com";

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
