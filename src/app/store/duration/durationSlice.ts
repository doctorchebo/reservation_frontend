import { Duration } from "@/app/types/durationType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface DurationState {
  durations: Duration[];
  duration: Duration | undefined;
  loading: boolean;
  error: string | undefined;
  success: boolean
}

const initialState: DurationState = {
  durations: [],
  duration: undefined,
  loading: false,
  error: undefined,
  success: false
};

const durationSlice = createSlice({
  name: "duration",
  initialState,
  reducers: {
    setDurations: (state, action: PayloadAction<Duration[]>) => {
      state.durations = action.payload;
    },
    setDuration: (state, action: PayloadAction<Duration>) => {
      state.duration = action.payload;
    },

    addDuration: (state, action: PayloadAction<Duration>) => {
      state.durations = [...state.durations, action.payload];
    },
    removeDuration: (state, action: PayloadAction<Duration>) => {
      state.durations = state.durations.filter(
        (duration) => duration.id !== action.payload.id
      );
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
  setDurations,
  setDuration,
  addDuration,
  removeDuration,
  setLoading,
  setError,
  setSuccess
} = durationSlice.actions;
export default durationSlice.reducer;
