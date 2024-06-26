import { User } from "@/app/types/UserType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User | undefined;
  users: User[];
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: undefined,
  users: [],
  loading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setUsers, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
