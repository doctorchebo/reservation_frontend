import { api } from "@/app/api/api";
import {
  AddressPatchLatitudeRequest,
  AddressPatchLongitudeRequest,
  AddressPatchNameRequest,
  AddressPatchRequest,
} from "@/app/types/addressType";
import axios from "axios";
import { AppDispatch } from "../store";
import { addAddress, setAddresses, setError, setLoading } from "./addressSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing address operation:" + error));
  }
};

export const getAllAddressesByBusinessId =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `address/getAllByBusinessId/${businessId}`
      );
      dispatch(setAddresses(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchAddressName =
  (request: AddressPatchNameRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("address/patchName", request);
      dispatch(addAddress(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchAddressLatitude =
  (request: AddressPatchLatitudeRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("address/patchLatitude", request);
      dispatch(addAddress(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchAddressLongitude =
  (request: AddressPatchLongitudeRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("address/patchLongitude", request);
      dispatch(addAddress(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchAddressIsMainAddress =
  (request: AddressPatchRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("address/patchIsMainAddress", request);
      dispatch(addAddress(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
