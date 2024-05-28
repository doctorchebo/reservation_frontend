import { freeApi } from "@/app/api/freeApi";
import { AppDispatch } from "../store";
import { setCategories, setLoading } from "./categorySlice";

export const getCategories = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await freeApi.get("category/getAll");
    dispatch(setCategories(response.data));
  } catch (error) {
  } finally {
    dispatch(setLoading(false));
  }
};


