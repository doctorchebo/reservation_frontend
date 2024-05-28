import { freeApi } from "@/app/api/freeApi";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AppDispatch } from "../store";
import { setError, setLoading, setReservations } from "./reservationSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing Reservation operation:" + error));
  }
};

export const getReservationsByDate =
  (serviceId: string, businessId: number, date: Dayjs) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await freeApi.get(
        `reservation/getAllByStartDate/${serviceId}/${businessId}/${date}`
      );
      dispatch(setReservations(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
