import { api } from "@/app/api/api";
import {
  BusinessPatchCategoriesRequest,
  BusinessPatchMembersRequest,
  BusinessPatchNameRequest,
  BusinessPatchServicesRequest,
} from "@/app/types/businessType";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import {
  addBusiness,
  setBusiness,
  setBusinesses,
  setError,
  setLoading,
  setSuccess,
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
    const response = await api.get("business/getAll");
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
      const response = await api.get(`business/getById/${businessId}`);
      dispatch(setBusiness(response.data));
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
      const response = await api.get(
        `business/getAllByCategoryId/${categoryId}`
      );
      dispatch(setBusinesses(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getBusinessesByUserId =
  (userId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`business/getAllByUserId/${userId}`);
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
      const response = await api.get(
        `business/getAvailableByServiceId/${serviceId}/${startDate}`
      );
      dispatch(setBusinesses(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchBusinessName =
  (request: BusinessPatchNameRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("business/patchName", request);
      dispatch(addBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchBusinessCategories =
  (request: BusinessPatchCategoriesRequest) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("business/patchCategories", request);
      dispatch(addBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchBusinessActiveMembers =
  (request: BusinessPatchMembersRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("business/patchActiveMembers", request);
      dispatch(addBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchBusinessServices =
  (request: BusinessPatchServicesRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("business/patchServices", request);
      dispatch(addBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
