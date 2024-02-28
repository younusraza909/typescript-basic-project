import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
