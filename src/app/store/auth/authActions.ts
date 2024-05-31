import { api } from "@/app/api/api";
import { authApi } from "@/app/api/authApi";
import { constants } from "@/app/constants/constants";
import {
  AuthError,
  AuthenticationResponse,
  LoginRequest,
  LogoutRequest,
  SignupRequest,
} from "@/app/types/authTypes";
import axios from "axios";
import { redirect } from "next/navigation";
import { AppDispatch } from "../store";
import {
  setAuthenticated,
  setError,
  setLoading,
  setLogin,
  setSignedup,
} from "./authSlice";

const handleError = (error: any, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as AuthError;
    const authError: AuthError = {
      timestamp: data.timestamp,
      status: error.response.status,
      errors: data.errors,
      path: data.path,
    };
    dispatch(setError(authError));
  }
};

export const login =
  (credentials: LoginRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.post("auth/login", credentials);
      if (response.status === 200) {
        dispatch(setLogin(response.data));
        dispatch(setAuthenticated(true));
        saveAuthInfo(response.data);
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

const saveAuthInfo = (response: AuthenticationResponse) => {
  localStorage.setItem(constants.authToken, response.authenticationToken);
  localStorage.setItem(constants.refreshToken, response.refreshToken);
  localStorage.setItem(constants.username, response.username);
};

export const signup =
  (credentials: SignupRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.post("auth/signup", credentials);
      if (response.status === 201) {
        dispatch(setSignedup(true));
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout =
  (logoutRequest: LogoutRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.post("auth/logout", logoutRequest);
      if (response.status === 200) {
        dispatch(setAuthenticated(false));
        removeTokens();
        redirect("/");
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

const removeTokens = () => {
  localStorage.removeItem(constants.authToken);
  localStorage.removeItem(constants.refreshToken);
  localStorage.removeItem(constants.username);
};

export const authenticate = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("auth/authenticate");
    if (response.status === 200) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};
