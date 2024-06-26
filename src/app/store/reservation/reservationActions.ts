import { api } from "@/app/api/api";
import { ReservationRequest } from "@/app/types/reservationType";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import {
  addReservation,
  removeReservationsDetailed,
  setError,
  setLoading,
  setReservation,
  setReservations,
  setReservationsDetailed,
} from "./reservationSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing Reservation operation:" + error));
  }
};

export const getAllReservationsByStartDate =
  (serviceId: string, businessId: number, date: Dayjs) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `reservation/getAllByStartDate/${serviceId}/${businessId}/${date}`
      );
      dispatch(setReservations(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllReservationsByMemberAndStartDate =
  (memberId: string, serviceId: string, businessId: number, date: Dayjs) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `reservation/getAllByMemberAndStartDate/${memberId}/${serviceId}/${businessId}/${date}`
      );
      dispatch(setReservations(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllReservationsForCurrentUser =
  () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get("reservation/getAllForCurrentUser");
      dispatch(setReservationsDetailed(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createReservation =
  (reservation: ReservationRequest) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post("reservation/create", reservation);
      dispatch(setReservation(response.data));
      dispatch(addReservation(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteReservation =
  (reservationId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.delete(`reservation/delete/${reservationId}`);
      dispatch(removeReservationsDetailed(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
