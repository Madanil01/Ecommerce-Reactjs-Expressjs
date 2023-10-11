// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Initialize an empty array to store cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Add the selected product to the cart
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // Remove an item from the cart based on some criteria (e.g., product ID)
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
