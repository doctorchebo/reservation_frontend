import { Address } from "@/app/types/addressType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
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
  },
});

export const { setAddresses, addAddress, setLoading, setError } =
  addressSlice.actions;
export default addressSlice.reducer;
