import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "../../services/api";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: { rate: number; count: number };
  category: string;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  item: Product;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductState = {
  items: [],
  item: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
    category: "",
  },
  filteredItems: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await getProducts();
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/id",
  async (id: any) => {
    const response = await getProductById(id);
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();

      if (query === "") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = [...action.payload];
        state.filteredItems = [...action.payload];
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { filterProducts } = productSlice.actions;

export default productSlice.reducer;
