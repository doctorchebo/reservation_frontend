import { api } from "@/app/api/api";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  setDuration,
  setDurations,
  setError,
  setLoading,
} from "./durationSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing Duration operation:" + error));
  }
};

export const getDurations =
  (serviceId: string, businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `duration/getAllByServiceIdAndBusinessId/${serviceId}/${businessId}`
      );
      dispatch(setDuration(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllDurationsByBusinessId =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `duration/getAllByBusinessId/${businessId}`
      );
      dispatch(setDurations(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
