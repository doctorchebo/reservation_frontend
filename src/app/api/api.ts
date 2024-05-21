import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const stringAuthToken = localStorage.getItem("authToken");
  const authToken =
    stringAuthToken != null ? JSON.parse(stringAuthToken) : undefined;
  if (authToken) {
    config.headers!.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
