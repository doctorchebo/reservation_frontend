import { Reservation, ReservationDetailed } from "@/app/types/reservationType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
interface ReservationState {
  reservations: Reservation[];
  reservationsDetailed: ReservationDetailed[];
  reservation: Reservation | null;
  loading: boolean;
  error: string | undefined;
  date: Dayjs | undefined;
  schedule: Dayjs | undefined;
}

const initialState: ReservationState = {
  reservations: [],
  reservationsDetailed: [],
  reservation: null,
  loading: false,
  error: undefined,
  date: dayjs(new Date()).startOf("day"),
  schedule: undefined,
};

const reservationReducer = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
    setReservationsDetailed: (
      state,
      action: PayloadAction<ReservationDetailed[]>
    ) => {
      state.reservationsDetailed = action.payload;
    },
    removeReservationsDetailed: (
      state,
      action: PayloadAction<ReservationDetailed>
    ) => {
      state.reservationsDetailed = state.reservationsDetailed.filter(
        (res) => res.id !== action.payload.id
      );
    },
    setReservation: (state, action: PayloadAction<Reservation | null>) => {
      state.reservation = action.payload;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations = [...state.reservations, action.payload];
    },
    setDate: (state, action: PayloadAction<Dayjs>) => {
      state.date = action.payload;
    },
    setSchedule: (state, action: PayloadAction<Dayjs>) => {
      state.schedule = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setReservations,
  setReservationsDetailed,
  removeReservationsDetailed,
  setReservation,
  addReservation,
  setDate,
  setSchedule,
  setLoading,
  setError,
} = reservationReducer.actions;
export default reservationReducer.reducer;
