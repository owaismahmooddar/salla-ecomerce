import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import authSlice from "./slices/authSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer,
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore, { debug: true });

export default store;
