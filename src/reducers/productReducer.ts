import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchProductsParams } from "../types/category";
import {
  Product,
  ProductPostType,
  ProductReducerType,
  updateActionType,
} from "../types/product";

const initialState: ProductReducerType = {
  productList: [],
  sortedList: [],
};

export const fetchProducts = createAsyncThunk(
  "fetchProduct",
  async ({ offset, limit, sorting }: FetchProductsParams) => {
    try {
      const data = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      let result = await data.json();
      if (sorting === "category") {
        result.sort((a: any, b: any) => {
          if (a.category.id < b.category.id) {
            return -1;
          }
          if (a.category.id > b.category.id) {
            return 1;
          }
          return 0;
        });
        return result;
      } else result.sort((a: any, b: any) => a.price - b.price);
      // console.log(result);
      return result;
    } catch (error: any) {
      console.log("could not fetch products");
    }
  }
);
export const deleteProductAsync = createAsyncThunk(
  "deleteProduct",
  async (productId: string) => {
    try {
      const data = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        { method: "DELETE" }
      );

      const result = await data.json();
      return productId;
    } catch (error: any) {
      console.log("could not delete product.");
    }
  }
);

export const addProductToApi = createAsyncThunk(
  "addProductToApi",
  async (product: ProductPostType) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/products/",
        { product }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log("failed to add product to API");
    }
  }
);

const productSlice = createSlice({
  name: "productReducer",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productList.push(action.payload);
      state.sortedList.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<updateActionType>) => {
      const newState = state.productList.map((product) => {
        if (product.id === action.payload.id) {
          product = {
            ...product,
            ...action.payload.update,
          };
        }
        return product;
      });
      state.productList = [...newState];
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload.id
      );
      return state;
    },
    sortByCategory: (state, action) => {
      state.sortedList = state.productList.filter(
        (product) => product.category.name === action.payload
      );
    },
    sortByPriceAsc: (state, action) => {
      state.sortedList = state.productList.sort((a, b) => a.price - b.price);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.productList = action.payload;
          state.sortedList = action.payload;
        }
      )
      .addCase(
        deleteProductAsync.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.productList = state.productList.filter(
            (product) => product.id !== action.payload
          );
        }
      )
      .addCase(addProductToApi.fulfilled, (state, action) => {
        state.productList.push(action.payload);
      });
  },
});

export const productReducer = productSlice.reducer;
export const {
  addProduct,
  updateProduct,
  deleteProduct,
  sortByCategory,
  sortByPriceAsc,
} = productSlice.actions;
