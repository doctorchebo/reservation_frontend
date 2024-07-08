import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UI {
  isDrawerOpen: boolean;
  selectedTab: string | undefined;
}

const UIState: UI = {
  isDrawerOpen: true,
  selectedTab: undefined,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: UIState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setSelectedTab: (state, action: PayloadAction<string | undefined>) => {
      console.log("setting selected tab to: " + action.payload);
      state.selectedTab = action.payload;
    },
  },
});

export const { setIsDrawerOpen, setSelectedTab } = uiSlice.actions;
export default uiSlice.reducer;
