import axios from "axios";

const apiUrl = import.meta.env.VITER_API_URL ?? "http://127.0.0.1:5000/api";

const request = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
