import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./auth/authSlice";
import businessReducer from "./business/businessSlice";
import categoryReducer from "./category/categorySlice";
import durationReducer from "./duration/durationSlice";
import memberReducer from "./member/memberSlice";
import reservationReducer from "./reservation/reservationSlice";
import serviceReducer from "./service/serviceSlice";
import userReducer from "./user/userSlice";
export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    category: categoryReducer,
    business: businessReducer,
    service: serviceReducer,
    duration: durationReducer,
    authentication: authenticationReducer,
    user: userReducer,
    member: memberReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
