import { api } from "@/app/api/api";
import axios from "axios";
import { AppDispatch } from "../store";
import { setError, setLoading, setPrices } from "./priceSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  } else {
    dispatch(setError("Error while doing Price operation:" + error));
  }
};

export const getAllPricesByBusinessId =
  (businessId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get(`price/getAllByBusinessId/${businessId}`);
      dispatch(setPrices(response.data));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
