import { Business } from "@/app/types/businessType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BusinessState {
  businesses: Business[];
  loading: boolean;
  error: string | undefined;
}

const initialState: BusinessState = {
  businesses: [],
  loading: false,
  error: undefined,
};
const businessSlice = createSlice({
  name: "Business",
  initialState,
  reducers: {
    setBusinesses: (state, action: PayloadAction<Business[]>) => {
      state.businesses = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setBusinesses, setLoading, setError } = businessSlice.actions;
export default businessSlice.reducer;
