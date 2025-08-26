import { createSlice } from "@reduxjs/toolkit";
import type { CartItemType } from "../../app/types";
import type { PayloadAction } from "@reduxjs/toolkit";

type CardStateType = {
  items: CartItemType[];
  active: boolean;
};

const initialState: CardStateType = {
  items: [
    {
      id: 1123,
      name: "default",
      price: 44,
      quantity: 1,
      totalPrice: 20,
      sizeOption: 26,
      typeOption: 0,
      imageUrl: "pizza_4.png",
    },
  ],
  // items: [],
  active: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else state.items.push(action.payload);
    },
    deleteFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const currentItem = state.items.find((item) => item.id === action.payload.id);
      if (currentItem && currentItem.quantity > 1) {
        console.log("decrease");
        currentItem.quantity -= 1;
        currentItem.totalPrice -= currentItem.price;
      } else {
        console.log("delete", action.payload.id);
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      }
    },
    cleanCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, cleanCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
