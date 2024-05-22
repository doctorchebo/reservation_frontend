import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import reservationReducer from "./reservation/reservationSlice";
import businessReducer from "./business/businessSlice"
export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    category: categoryReducer,
    business: businessReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
