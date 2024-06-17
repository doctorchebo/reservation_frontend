import { api } from "@/app/api/api";
import { ServicePatchDurationsRequest } from "@/app/types/serviceType";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import { setError, setLoading, setService, setServices } from "./serviceSlice";

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
      const response = await api.get(
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
      const response = await api.get(
        `service/getAllByBusinessId/${businessId}`
      );
      dispatch(setServices(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAvailableServicesByBusinessId =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `service/getAllAvailableByBusinessId/${businessId}`
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
      const response = await api.get(
        `service/getAvailableServices/${serviceId}/${startDate}`
      );
      dispatch(setServices(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getServiceById =
  (serviceId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`service/getById/${serviceId}`);
      dispatch(setService(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchServiceDurations =
  (request: ServicePatchDurationsRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("service/patchDurations", request);
      dispatch(setService(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
