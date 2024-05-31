import { freeApi } from "@/app/api/freeApi";
import axios from "axios";
import { AppDispatch } from "../store";
import { setDuration, setError, setLoading } from "./durationSlice";
import { api } from "@/app/api/api";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing Duration operation:" + error));
  }
};

export const getDurations =
  (serviceId: string, businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(
        `duration/getAllByServiceIdAndBusinessId/${serviceId}/${businessId}`
      );
      dispatch(setDuration(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
