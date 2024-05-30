import { AuthError, AuthenticationResponse } from "@/app/types/authTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isSignedup: boolean;
  username: string | undefined;
  loading: boolean;
  error: AuthError | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: undefined,
  isSignedup: false,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setSignedup: (state, action: PayloadAction<boolean>) => {
      state.isSignedup = action.payload;
    },
    setLogin: (state, action: PayloadAction<AuthenticationResponse>) => {
      const response = action.payload;
      state.username = response.username;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<AuthError | undefined>) => {
      state.error = action.payload;
    },
  },
});

export const { setAuthenticated, setLogin, setSignedup, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
