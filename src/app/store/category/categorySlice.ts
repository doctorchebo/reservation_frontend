import { Category } from "@/app/types/categoryType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: String | undefined;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: undefined,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<String>) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError } = categorySlice.actions;
export default categorySlice.reducer;
