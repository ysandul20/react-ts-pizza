import { createSlice } from "@reduxjs/toolkit";
import type { CartItemType } from "../../app/types";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartStateType = {
  items: CartItemType[];
  active: boolean;
};

const cartItemsFromStorage = localStorage.getItem("cart");
const initialState: CartStateType = {
  // items: [
  //   {
  //     id: 1123,
  //     compositeId: "1123_26_1",
  //     name: "default",
  //     price: 44,
  //     quantity: 1,
  //     totalPrice: 20,
  //     sizeOption: 26,
  //     typeOption: 0,
  //     imageUrl: "pizza_4.png",
  //   },
  // ],
  items: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
  active: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const existingItem = state.items.find((item) => item.compositeId === action.payload.compositeId);
      // console.log(existingItem?.compositeId);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    deleteFromCart: (state, action: PayloadAction<CartItemType>) => {
      const currentItem = state.items.find((item) => item.compositeId === action.payload.compositeId);
      // const currentItem = state.items.find((item) => item.id === action.payload.id);
      if (currentItem && currentItem.quantity > 1) {
        console.log("decrease");
        currentItem.quantity -= 1;
        currentItem.totalPrice -= currentItem.price;
      } else {
        // console.log("delete", action.payload.compositeId);
        state.items = state.items.filter((item) => item.compositeId !== action.payload.compositeId);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    cleanCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, cleanCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
