import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
