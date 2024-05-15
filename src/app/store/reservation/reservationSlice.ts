import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Reservation {
  id: number;
}

interface ReservationState {
  reservations: Reservation[];
}

const initialState: ReservationState = {
  reservations: [],
};

const reservationReducer = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
  },
});

export const { setReservations } = reservationReducer.actions;
export default reservationReducer.reducer;
