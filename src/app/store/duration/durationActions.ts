import { api } from "@/app/api/api";
import { DurationCreateRequest } from "@/app/types/durationType";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  addDuration,
  removeDuration,
  setDuration,
  setDurations,
  setError,
  setLoading,
  setSuccess,
} from "./durationSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing Duration operation:" + error));
  }
};

export const getAllDurationsByServiceIdAndBusinessId =
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

export const createDuration =
  (request: DurationCreateRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post("duration/create", request);
      dispatch(addDuration(response.data));
      dispatch(setSuccess(true))
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteDuration =
  (durationId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.delete(`duration/delelte/${durationId}`);
      dispatch(removeDuration(response.data));
      dispatch(setSuccess(true))
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
