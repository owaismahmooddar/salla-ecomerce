import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { getUserCart } from "@/services/api";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCartAsync",
  async (items: CartItem[], { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      try {
        const response = await axios.post("/carts", {
          userId: 1,
          date: "2020-02-03",
          products: items.map((item) => {
            return { productId: item.id, quantity: item.quantity };
          }),
        });
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    } else {
      return items;
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    // const state = getState() as RootState;
    // const user = state.auth.token;

    // if (user) {
    try {
      const response = await getUserCart(1);
      return response.data;
    } catch (err: any) {
      // return rejectWithValue(err.response.data);
    }
    // }
    // return ;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        addItemToCartAsync.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          const existingItem = state.items.find(
            (item) => item.id === action.payload.id
          );
          if (existingItem) {
            existingItem.quantity += action.payload.quantity;
          } else {
            state.items.push(action.payload);
          }
        }
      )
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
