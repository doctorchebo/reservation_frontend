import { Price } from "@/app/types/priceType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface PriceState {
  prices: Price[];
  loading: boolean;
  error: string | null;
}

const initialState: PriceState = {
  prices: [],
  loading: false,
  error: null,
};
const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<Price[]>) => {
      state.prices = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setPrices, setLoading, setError } = priceSlice.actions;
export default priceSlice.reducer;
