import { Business } from "@/app/types/businessType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BusinessState {
  businesses: Business[];
  business: Business | undefined;
  loading: boolean;
  error: string | undefined;
  searched: boolean;
}

const initialState: BusinessState = {
  businesses: [],
  business: undefined,
  loading: false,
  error: undefined,
  searched: false,
};
const businessSlice = createSlice({
  name: "Business",
  initialState,
  reducers: {
    setBusinesses: (state, action: PayloadAction<Business[]>) => {
      state.businesses = action.payload;
    },
    setBusiness: (state, action: PayloadAction<Business>) => {
      state.business = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSearched: (state, action: PayloadAction<boolean>) => {
      state.searched = action.payload;
    },
  },
});

export const { setBusinesses, setBusiness, setLoading, setError, setSearched } =
  businessSlice.actions;
export default businessSlice.reducer;
