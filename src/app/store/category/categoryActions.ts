import { api } from "@/app/api/api";
import { apiMultipart } from "@/app/api/apiMultipart";
import {
  CategoryCreateRequest,
  CategoryPatchImageRequest,
  CategoryPatchNameRequest,
} from "@/app/types/categoryType";
import { AppDispatch } from "../store";
import {
  addCategory,
  removeCategory,
  setCategories,
  setCategory,
  setLoading,
  setSuccess,
} from "./categorySlice";

export const getAllCategories = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("category/getAll");
    dispatch(setCategories(response.data));
  } catch (error) {
  } finally {
    dispatch(setLoading(false));
  }
};

export const createCategory =
  (request: CategoryCreateRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("name", String(request.name));
      formData.append("image", request.image!);
      const response = await apiMultipart.post("category/create", formData);
      dispatch(addCategory(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchCategoryName =
  (request: CategoryPatchNameRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("category/patchName", request);
      dispatch(setCategory(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchCategoryImage =
  (request: CategoryPatchImageRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("categoryId", String(request.categoryId));
      formData.append("image", request.image);
      const response = await apiMultipart.patch("category/patchImage", request);
      dispatch(setCategory(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteCategory =
  (categoryId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.delete(`category/delete/${categoryId}`);
      dispatch(removeCategory(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };
