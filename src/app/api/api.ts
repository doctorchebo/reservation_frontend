import axios from "axios";
import { constants } from "../constants/constants";
import { RefreshTokenRequest } from "../types/authTypes";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(constants.authToken);
    if (authToken) {
      config.headers!.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // remove data from local storage
      localStorage.removeItem(constants.authToken);
      localStorage.removeItem(constants.username);
      const refreshToken = localStorage.getItem(constants.refreshToken);
      if (refreshToken) {
        // build refreshToken body
        const username = localStorage.getItem(constants.username);
        if (username) {
          const refreshTokenRequest: RefreshTokenRequest = {
            refreshToken: refreshToken,
            username: username,
          };
          // Attempt to get a new access token using the refresh token
          const response = await axios.post(
            `http://localhost:8080/api/auth/refresh/token`,
            refreshTokenRequest
          );
          const { authenticationToken } = response.data;
          localStorage.setItem(constants.authToken, authenticationToken);
          // Retry the original request with the new token
          originalRequest.headers["Authorization"] =
            "Bearer " + authenticationToken;
          return api(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);
