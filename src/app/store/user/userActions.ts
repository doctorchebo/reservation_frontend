import { api } from "@/app/api/api";
import { constants } from "@/app/constants/constants";
import { AuthError } from "@/app/types/authTypes";
import axios from "axios";
import { setError } from "../auth/authSlice";
import { AppDispatch } from "../store";
import { setLoading, setUser, setUsers } from "./userSlice";

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

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("user/getAll");
    if (response.status === 200) {
      dispatch(setUsers(response.data));
      saveUsername(response.data.username);
    }
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserData = (email: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get(`user/getByEmail/${email}`);
    if (response.status === 200) {
      dispatch(setUser(response.data));
      saveUsername(response.data.username);
    }
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getAllUsersByBusinessId =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`user/getByEmail/${email}`);
      if (response.status === 200) {
        dispatch(setUser(response.data));
        saveUsername(response.data.username);
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

const saveUsername = (username: string) => {
  localStorage.setItem(constants.username, username);
};
