import { api } from "@/app/api/api";
import axios from "axios";
import { AppDispatch } from "../store";
import { setBusinesses, setError, setLoading } from "./businessSlice";
import { freeApi } from "@/app/api/freeApi";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing business operation:" + error));
  }
};

export const getBusinesses = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await freeApi.get("business/getAll");
    dispatch(setBusinesses(response.data));
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};
