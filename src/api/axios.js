import axios from "axios";

console.log(process.env.NODE_ENV);

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://chatgenious-api.onrender.com";

console.log(baseURL);

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
