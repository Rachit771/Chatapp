import axios from "axios";

const apiBaseUrl =
  (import.meta.env.VITE_API_URL || "http://localhost:7000").replace(/\/+$/, "");

const instance = axios.create({
  baseURL: apiBaseUrl,
});

export default instance;
