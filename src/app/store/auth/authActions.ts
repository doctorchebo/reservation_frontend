import { freeApi } from "@/app/api/freeApi";
import { constants } from "@/app/constants/constants";
import {
  AuthError,
  AuthenticationResponse,
  LoginRequest,
  SignupRequest,
} from "@/app/types/authTypes";
import axios from "axios";
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
      const response = await freeApi.post("auth/login", credentials);
      if (response.status === 200) {
        dispatch(setLogin(response.data));
        dispatch(setAuthenticated(true));
        saveTokens(response.data);
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

const saveTokens = (response: AuthenticationResponse) => {
  localStorage.setItem(constants.authToken, response.authenticationToken);
  localStorage.setItem(constants.refreshToken, response.refreshToken);
};

export const signup =
  (credentials: SignupRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.post("auth/signup", credentials);
      if (response.status === 201) {
        dispatch(setSignedup(true));
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
