import axios from "axios";
import { constants } from "../constants/constants";
import { RefreshTokenRequest } from "../types/authTypes";

export const apiMultipart = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

apiMultipart.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(constants.authToken);
    if (authToken) {
      config.headers!.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiMultipart.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // remove data from local storage
      console.log("got 401 error, deleting auth token from local storage");
      localStorage.removeItem(constants.authToken);
      const refreshToken = localStorage.getItem(constants.refreshToken);
      if (refreshToken) {
        // build refreshToken body
        const email = localStorage.getItem(constants.email);
        if (email) {
          const refreshTokenRequest: RefreshTokenRequest = {
            refreshToken: refreshToken,
            email: email,
          };
          // Attempt to get a new access token using the refresh token
          console.log("trying to refresh auth token");
          const response = await apiMultipart.post(
            `auth/refresh/token`,
            refreshTokenRequest
          );
          const { authenticationToken } = response.data;
          localStorage.setItem(constants.authToken, authenticationToken);
          // Retry the original request with the new token
          originalRequest.headers["Authorization"] =
            "Bearer " + authenticationToken;
          return apiMultipart(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);
