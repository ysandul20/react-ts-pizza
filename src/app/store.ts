import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../features/pizza/dataSlice";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
   reducer: {
      data: dataSlice,
      cart: cartSlice,
   },
});

// Типи для TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
