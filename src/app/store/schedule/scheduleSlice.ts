import { AuthErrorSimple } from "@/app/types/authTypes";
import { Schedule } from "@/app/types/scheduleType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ScheduleState {
  schedules: Schedule[];
  schedule: Schedule | undefined;
  loading: boolean;
  error: AuthErrorSimple | undefined;
  success: boolean;
}

const initialState: ScheduleState = {
  schedules: [],
  schedule: undefined,
  loading: false,
  error: undefined,
  success: false,
};
const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedules: (state, action: PayloadAction<Schedule[]>) => {
      state.schedules = action.payload;
    },
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedules = [...state.schedules, action.payload];
    },
    removeSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== action.payload.id
      );
    },
    setSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedule = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<AuthErrorSimple | undefined>) => {
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
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
