import { freeApi } from "@/app/api/freeApi";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import { setError, setLoading, setServices } from "./serviceSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing service operation:" + error));
  }
};

export const getServicesByCategoryId =
  (categoryId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(
        `service/getAllByCategoryId/${categoryId}`
      );
      dispatch(setServices(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getServicesByBusinessId =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(
        `service/getAllByBusinessId/${businessId}`
      );
      dispatch(setServices(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllByServiceIdAndStartDate =
  (serviceId: string, startDate: Dayjs) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(
        `service/getAvailableServices/${serviceId}/${startDate}`
      );
      dispatch(setServices(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
