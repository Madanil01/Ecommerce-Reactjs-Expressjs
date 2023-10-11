// store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import your cartSlice reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart reducer to your store
    // ...other reducers if you have them
  },
});

export default store;
