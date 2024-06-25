import { Category } from "@/app/types/categoryType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: String | undefined;
  success: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: undefined,
  success: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        } else {
          return category;
        }
      });
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
    removeCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<String>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const {
  setCategories,
  setCategory,
  addCategory,
  removeCategory,
  setLoading,
  setError,
  setSuccess,
} = categorySlice.actions;
export default categorySlice.reducer;
