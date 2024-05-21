import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import reservationReducer from "./reservation/reservationSlice";
export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
