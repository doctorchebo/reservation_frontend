import { api } from "@/app/api/api";
import {
  PatchMemberFirstNameRequest,
  PatchMemberLastNameRequest,
} from "@/app/types/memberType";
import axios from "axios";
import { AppDispatch } from "../store";
import { setError, setLoading, setMember, setMembers } from "./memberSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing business operation:" + error));
  }
};

export const getMembers =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`member/getAllByBusinessId/${businessId}`);
      dispatch(setMembers(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getMemberById =
  (memberId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`member/getById/${memberId}`);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getMemberByUserId =
  (userId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`member/getByUserId/${userId}`);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchMemberFirstName =
  (request: PatchMemberFirstNameRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("member/patchFirstName", request);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchMemberLastName =
  (request: PatchMemberLastNameRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("member/patchLastName", request);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
