import { ISchedule } from "@/app/types/scheduleType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Schedule {
  schedules: ISchedule[];
  schedule: ISchedule | undefined;
  loading: boolean;
  error: string | undefined;
  success: boolean;
}

const initialState: Schedule = {
  schedules: [],
  schedule: undefined,
  loading: false,
  error: undefined,
  success: false,
};
const businessSlice = createSlice({
  name: "Business",
  initialState,
  reducers: {
    setSchedules: (state, action: PayloadAction<ISchedule[]>) => {
      state.schedules = action.payload;
    },
    addSchedule: (state, action: PayloadAction<ISchedule>) => {
      state.schedules = state.schedules.map((schedule) => {
        if (schedule.id === action.payload.id) {
          return action.payload;
        } else {
          return schedule;
        }
      });
    },
    removeSchedule: (state, action: PayloadAction<ISchedule>) => {
      state.schedules = state.schedules.filter(
        (business) => business.id !== action.payload.id
      );
    },
    setSchedule: (state, action: PayloadAction<ISchedule>) => {
      state.schedule = action.payload;
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
  setSchedules,
  addSchedule,
  removeSchedule,
  setSchedule,
  setLoading,
  setError,
  setSuccess,
} = businessSlice.actions;
export default businessSlice.reducer;
