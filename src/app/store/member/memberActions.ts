import { api } from "@/app/api/api";
import {
  MemberPatchAddressRequest,
  MemberPatchFirstNameRequest,
  MemberPatchLastNameRequest,
  MemberPatchPhoneNumberRequest,
  MemberPatchTitleRequest,
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
  (request: MemberPatchFirstNameRequest) => async (dispatch: AppDispatch) => {
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
  (request: MemberPatchLastNameRequest) => async (dispatch: AppDispatch) => {
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

export const patchMemberPhoneNumber =
  (request: MemberPatchPhoneNumberRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("member/patchPhoneNumber", request);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const patchMemberTitle =
  (request: MemberPatchTitleRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("member/patchTitle", request);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const patchMemberAddress =
  (request: MemberPatchAddressRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.patch("member/patchAddress", request);
      dispatch(setMember(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
