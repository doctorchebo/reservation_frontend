import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./business/businessSlice";
import categoryReducer from "./category/categorySlice";
import durationReducer from "./duration/durationSlice";
import reservationReducer from "./reservation/reservationSlice";
import serviceReducer from "./service/serviceSlice";
export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    category: categoryReducer,
    business: businessReducer,
    service: serviceReducer,
    duration: durationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
