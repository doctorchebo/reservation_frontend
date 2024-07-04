import { api } from "@/app/api/api";
import { AuthErrorSimple } from "@/app/types/authTypes";
import {
  ScheduleCreateRequest,
  SchedulePatchDayOfWeekRequest,
  SchedulePatchEndTime,
  SchedulePatchIsWholeDay,
  SchedulePatchStartTime,
} from "@/app/types/scheduleType";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  addSchedule,
  removeSchedule,
  setError,
  setLoading,
  setSchedule,
  setSchedules,
  setSuccess,
} from "./scheduleSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as AuthErrorSimple;
    const authError: AuthErrorSimple = {
      timestamp: data.timestamp,
      status: error.response.status,
      error: data.error,
      path: data.path,
    };
    dispatch(setError(authError));
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
  (request: ScheduleCreateRequest) => async (dispatch: AppDispatch) => {
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

export const patchScheduleDayOfWeek =
  (request: SchedulePatchDayOfWeekRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("schedule/patchDayOfWeek", request);
      dispatch(setSchedule(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchScheduleIsWholeDay =
  (request: SchedulePatchIsWholeDay) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("schedule/patchIsWholeDay", request);
      dispatch(setSchedule(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchScheduleStartTime =
  (request: SchedulePatchStartTime) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("schedule/patchStartTime", request);
      if (response.status === 200) {
        dispatch(setSchedule(response.data));
        dispatch(setSuccess(true));
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const patchScheduleEndTime =
  (request: SchedulePatchEndTime) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("schedule/patchEndTime", request);
      if (response.status === 200) {
        dispatch(setSchedule(response.data));
        dispatch(setSuccess(true));
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
