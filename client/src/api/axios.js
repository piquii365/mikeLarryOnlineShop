import axios from "axios";
export const BASE_URL = "http://localhost:3001";
export default axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
export const axiosMediaPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "multipart/form-data" },
  withCredentials: true,
});
