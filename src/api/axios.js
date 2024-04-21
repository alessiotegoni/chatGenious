import axios from "axios";

const baseURL = "http://chatGenious.api.onrender.com";

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
