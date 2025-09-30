import { createSlice } from "@reduxjs/toolkit";
import type { CartItemType } from "../../app/types";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartStateType = {
  items: CartItemType[];
  active: boolean;
};

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
  items: [],
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
    },
    deleteFromCart: (state, action: PayloadAction<CartItemType>) => {
      const currentItem = state.items.find((item) => item.compositeId === action.payload.compositeId);
      // const currentItem = state.items.find((item) => item.id === action.payload.id);
      if (currentItem && currentItem.quantity > 1) {
        console.log("decrease");
        currentItem.quantity -= 1;
        currentItem.totalPrice -= currentItem.price;
      } else {
        //TODO: Виправити видалення піцц з різними розмірами
        console.log("delete", action.payload.compositeId);
        state.items = state.items.filter((item) => item.compositeId !== action.payload.compositeId);
      }
    },
    cleanCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, cleanCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
