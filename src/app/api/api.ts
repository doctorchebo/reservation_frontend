import axios from "axios";
import { constants } from "../constants/constants";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const tokenString = localStorage.getItem(constants.authToken);
  const authToken = tokenString != null ? JSON.parse(tokenString) : null;
  if (authToken) {
    config.headers!.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
