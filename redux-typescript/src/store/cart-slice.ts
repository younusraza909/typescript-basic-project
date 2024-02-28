import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Item = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

interface CartState {
  items: Item[];
}

// Define the initial state using that type
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.items = state.items.map((i, index) =>
          index === itemIndex ? { ...i, quantity: i.quantity + 1 } : { ...i }
        );
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex >= 0) {
        state.items = state.items.map((i, index) =>
          index === itemIndex && i.quantity > 1
            ? { ...i, quantity: i.quantity - 1 }
            : { ...i }
        );
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
