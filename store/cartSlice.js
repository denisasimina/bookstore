import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        // Verifică dacă produsul există deja în coș
        const existingItem = state.items.find((item) => item._id === action.payload._id);
  
        if (!existingItem) {
          // Adaugă produsul doar dacă nu există
          state.items.push({ ...action.payload, quantity: 1 });
        } else {
          // Crește cantitatea dacă produsul există deja
          existingItem.quantity += 1;
        }
      },
    removeFromCart: (state, action) => {
        // Filtrează articolele care NU au _id-ul trimis prin payload
        state.items = state.items.filter((item) => item._id !== action.payload);
      },

      incrementQuantity: (state, action) => {
        const item = state.items.find((item) => item._id === action.payload);
        if (item) {
          item.quantity += 1;
        }
      },
      decrementQuantity(state, action) {
        const item = state.items.find((item) => item._id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }}
      
  },
});

// Exportă acțiunile
export const { addToCart, removeFromCart,incrementQuantity,decrementQuantity} = cartSlice.actions;

// Exportă reducer-ul
export default cartSlice.reducer;
