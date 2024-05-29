import { Reservation } from "@/app/types/reservationType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | undefined;
  date: Dayjs | undefined;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: undefined,
  date: dayjs(new Date()).startOf("day"),
};

const reservationReducer = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
    setDate: (state, action: PayloadAction<Dayjs>) => {
      state.date = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setReservations, setDate, setLoading, setError } =
  reservationReducer.actions;
export default reservationReducer.reducer;
