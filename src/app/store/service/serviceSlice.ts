import { Service } from "@/app/types/serviceType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ServiceState {
  services: Service[];
  serviceId: string | null;
  service: Service | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: ServiceState = {
  services: [],
  serviceId: "",
  service: null,
  loading: false,
  error: undefined,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setserviceId: (state, action: PayloadAction<string | null>) => {
      state.serviceId = action.payload;
    },
    setservice: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setServices, setserviceId, setservice, setLoading, setError } =
  serviceSlice.actions;
export default serviceSlice.reducer;
