import { freeApi } from "@/app/api/freeApi";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import {
  setBusinesses,
  setCurrentBusiness,
  setError,
  setLoading,
} from "./businessSlice";

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

export const getBusinessById =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(`business/getById/${businessId}`);
      dispatch(setCurrentBusiness(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getBusinessesByCategoryId =
  (categoryId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(
        `business/getAllByCategoryId/${categoryId}`
      );
      dispatch(setBusinesses(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAvailableBusinesses =
  (serviceId: string, startDate: Dayjs) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(
        `business/getAvailableByServiceId/${serviceId}/${startDate}`
      );
      dispatch(setBusinesses(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
