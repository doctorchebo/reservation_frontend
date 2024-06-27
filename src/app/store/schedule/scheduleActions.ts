import { api } from "@/app/api/api";
import { IScheduleCreateRequest } from "@/app/types/scheduleType";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  addSchedule,
  removeSchedule,
  setError,
  setLoading,
  setSchedules,
  setSuccess,
} from "./scheduleSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing business operation:" + error));
  }
};

export const getAllSchedulesByBusinessId =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `schedule/getAllByBusinessId/${businessId}`
      );
      dispatch(setSchedules(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllSchedulesByMemberId =
  (memberId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`schedule/getAllByMemberId/${memberId}`);
      dispatch(setSchedules(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllSchedulesByCalendarId =
  (calendarId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `schedule/getAllByCalendarId/${calendarId}`
      );
      dispatch(setSchedules(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createSchedule =
  (request: IScheduleCreateRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post("schedule/create", request);
      dispatch(addSchedule(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteSchedule =
  (scheduleId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.delete(`schedule/delete/${scheduleId}`);
      dispatch(removeSchedule(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
