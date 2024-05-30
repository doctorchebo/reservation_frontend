import axios from "axios";

export const freeApi = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
