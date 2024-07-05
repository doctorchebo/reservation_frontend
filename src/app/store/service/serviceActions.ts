import { api } from "@/app/api/api";
import {
  ServiceCreateRequest,
  ServicePatchAddressesRequest,
  ServicePatchDurationsRequest,
  ServicePatchNameRequest,
  ServicePatchPriceRequest,
} from "@/app/types/serviceType";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import {
  addService,
  removeService,
  setError,
  setLoading,
  setService,
  setServices,
  setSuccess,
} from "./serviceSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing service operation:" + error));
  }
};

export const getAllServicesByCategoryId =
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

export const patchServiceName =
  (request: ServicePatchNameRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("service/patchName", request);
      dispatch(setService(response.data));
      dispatch(setSuccess(true));
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
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchServiceAddresses =
  (request: ServicePatchAddressesRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("service/patchAddresses", request);
      dispatch(setService(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchServicePrice =
  (request: ServicePatchPriceRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("service/patchPrice", request);
      dispatch(setService(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const createService =
  (request: ServiceCreateRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post("service/create", request);
      dispatch(addService(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const deleteService =
  (serviceId: number | string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.delete(`service/deleteById/${serviceId}`);
      dispatch(removeService(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
