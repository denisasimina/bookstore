import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice"; // Reducer-ul cart
import thunk from "redux-thunk";

const persistConfig = {
  key: "cart", // Folosim cheia `cart` pentru stocare
  storage,      // Stocăm în localStorage
  whitelist: ["items"], // Persistăm doar lista de produse din coș
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Dezactivează verificarea de serializare
    }).concat(thunk),
});

export default store;
