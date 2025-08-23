import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../features/pizza/dataSlice";

export const store = configureStore({
   reducer: {
      data: dataSlice,
   },
});

// Типи для TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
