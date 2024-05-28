import { Duration } from "@/app/types/durationType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface DurationState {
  duration: Duration | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: DurationState = {
  duration: undefined,
  loading: false,
  error: undefined,
};

const durationSlice = createSlice({
  name: "duration",
  initialState,
  reducers: {
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

export const { setDuration, setLoading, setError } = durationSlice.actions;
export default durationSlice.reducer;
