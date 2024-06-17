import { Duration } from "@/app/types/durationType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface DurationState {
  durations: Duration[];
  duration: Duration | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: DurationState = {
  durations: [],
  duration: undefined,
  loading: false,
  error: undefined,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setDurations, setDuration, setLoading, setError } =
  durationSlice.actions;
export default durationSlice.reducer;
