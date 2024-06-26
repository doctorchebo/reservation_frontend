import { api } from "@/app/api/api";
import { apiMultipart } from "@/app/api/apiMultipart";
import {
  BusinessCreateRequest,
  BusinessPatchCategoriesRequest,
  BusinessPatchImagesRequest,
  BusinessPatchMembersRequest,
  BusinessPatchNameRequest,
  BusinessPatchServicesRequest,
} from "@/app/types/businessType";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import {
  addBusiness,
  removeBusiness,
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

export const getAllBusinesses = () => async (dispatch: AppDispatch) => {
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

export const getAllBusinessesByCategoryId =
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

export const getAllBusinessesByUserId =
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
      dispatch(setBusiness(response.data));
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
      dispatch(setBusiness(response.data));
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
      dispatch(setBusiness(response.data));
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
      dispatch(setBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchBusinessImages =
  (request: BusinessPatchImagesRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("businessId", String(request.businessId));

      request.files.forEach((fileObj, index) => {
        formData.append(`files[${index}].file`, fileObj.file);
        formData.append(`files[${index}].id`, String(fileObj.id));
        formData.append(`files[${index}].url`, fileObj.url);
      });

      const response = await apiMultipart.patch(
        "/business/patchImages",
        formData
      );
      dispatch(setBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createBusiness =
  (request: BusinessCreateRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post("business/create", request);
      dispatch(addBusiness(response.data));
      dispatch(setSuccess(true));
      dispatch(setBusiness(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteBusiness =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.delete(`business/delete/${businessId}`);
      dispatch(removeBusiness(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
