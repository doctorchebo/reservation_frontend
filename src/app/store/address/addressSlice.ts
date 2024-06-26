import { Address } from "@/app/types/addressType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
  success: false,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses = state.addresses.map((address) => {
        if (address.id === action.payload.id) {
          return action.payload;
        } else {
          return address;
        }
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const { setAddresses, addAddress, setLoading, setError, setSuccess } =
  addressSlice.actions;
export default addressSlice.reducer;
