import { Business } from "@/app/types/businessType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BusinessState {
  businesses: Business[];
  business: Business | undefined;
  loading: boolean;
  error: string | undefined;
  searched: boolean;
  success: boolean;
}

const initialState: BusinessState = {
  businesses: [],
  business: undefined,
  loading: false,
  error: undefined,
  searched: false,
  success: false,
};
const businessSlice = createSlice({
  name: "Business",
  initialState,
  reducers: {
    setBusinesses: (state, action: PayloadAction<Business[]>) => {
      state.businesses = action.payload;
    },
    addBusiness: (state, action: PayloadAction<Business>) => {
      state.businesses = [...state.businesses, action.payload];
    },
    removeBusiness: (state, action: PayloadAction<Business>) => {
      state.businesses = state.businesses.filter(
        (business) => business.id !== action.payload.id
      );
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
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const {
  setBusinesses,
  addBusiness,
  removeBusiness,
  setBusiness,
  setLoading,
  setError,
  setSearched,
  setSuccess,
} = businessSlice.actions;
export default businessSlice.reducer;
