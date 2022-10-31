import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchProductsParams } from "../types/category";
import { Product, updateActionType } from "../types/product";
import { ProductsInCart } from "../types/cart";
import { Cart } from "../types/cart";

const initialState: Cart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart reducer",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductsInCart>) => {
      console.log(action.payload.id);
      const check = state.products.map((item) => {
        if (item.id === action.payload.id) {
          console.log("Asdasdfa");
        }
      });
      console.log(check);
      if (!check) {
        console.log("check works");
        state.products.push(action.payload);
      }
      state.total += action.payload.price;
    },
    increaseProductAmount: (state, action: PayloadAction<Product>) => {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity += 1;
          state.total += action.payload.price;
        }
      });
    },
    decreaseProductAmount: (state, action: PayloadAction<Product>) => {
      state.products.map((product) => {
        if (product.id === action.payload.id && product.quantity > 0) {
          product.quantity -= 1;
          state.total -= action.payload.price;
        }
      });
    },
    deleteFromCart: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  deleteFromCart,
  increaseProductAmount,
  decreaseProductAmount,
} = cartSlice.actions;
