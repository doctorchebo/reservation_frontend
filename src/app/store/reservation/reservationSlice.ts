import { Reservation } from "@/app/types/reservationType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: undefined,
};

const reservationReducer = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setReservations, setLoading, setError } =
  reservationReducer.actions;
export default reservationReducer.reducer;
