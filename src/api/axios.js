import axios from "axios";

const baseOptions = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
};

export const axiosPrivate = axios.create({
  ...baseOptions,
  withCredentials: true,
});

export default axios.create(baseOptions);
