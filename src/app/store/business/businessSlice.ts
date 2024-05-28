import { Business } from "@/app/types/businessType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BusinessState {
  businesses: Business[];
  loading: boolean;
  error: string | undefined;
  searched: boolean
}

const initialState: BusinessState = {
  businesses: [],
  loading: false,
  error: undefined,
  searched: false
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
    setSearched: (state, action: PayloadAction<boolean>) => {
      state.searched = action.payload;
    },
  },
});

export const { setBusinesses, setLoading, setError, setSearched } = businessSlice.actions;
export default businessSlice.reducer;
