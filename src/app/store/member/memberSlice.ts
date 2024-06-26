import { Member } from "@/app/types/memberType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MemberState {
  members: Member[];
  member: Member | undefined;
  memberId: string | null;
  loading: boolean;
  error: string | undefined;
  success: boolean;
}

const initialState: MemberState = {
  members: [],
  memberId: null,
  member: undefined,
  loading: false,
  error: undefined,
  success: false,
};
const memberSlice = createSlice({
  name: "Business",
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    setMemberId: (state, action: PayloadAction<string>) => {
      state.memberId = action.payload;
    },
    setMember: (state, action: PayloadAction<Member>) => {
      state.member = action.payload;
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.members = [...state.members, action.payload];
    },
    removeMember: (state, action: PayloadAction<Member>) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload.id
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
  setMembers,
  addMember,
  removeMember,
  setMemberId,
  setMember,
  setLoading,
  setError,
  setSuccess,
} = memberSlice.actions;
export default memberSlice.reducer;
