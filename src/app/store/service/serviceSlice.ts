import { Service } from "@/app/types/serviceType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ServiceState {
  services: Service[];
  serviceId: string | null;
  service: Service | null;
  loading: boolean;
  error: string | undefined;
  success: boolean;
}

const initialState: ServiceState = {
  services: [],
  serviceId: "",
  service: null,
  loading: false,
  error: undefined,
  success: false,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setServiceId: (state, action: PayloadAction<string | null>) => {
      state.serviceId = action.payload;
    },
    setService: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services = [...state.services, action.payload];
    },
    removeService: (state, action: PayloadAction<Service>) => {
      state.services = state.services.filter((service) => {
        if (service.id !== action.payload.id) {
          return service;
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

export const {
  setServices,
  setServiceId,
  setService,
  addService,
  removeService,
  setLoading,
  setError,
  setSuccess,
} = serviceSlice.actions;
export default serviceSlice.reducer;
