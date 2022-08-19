import { rest } from "msw";
import { setupServer } from "msw/node";

import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  addProduct,
  deleteProductAsync,
  updateProduct,
  deleteProduct,
  fetchProducts,
  sortByCategory,
  addProductToApi,
} from "../../reducers/productReducer";
import { Product, ProductReducerType } from "../../types/product";
import products, { testProduct } from "../utils/product-utils";

const initialState: ProductReducerType = {
  productList: [],
  sortedList: [],
};

const currentState: ProductReducerType = {
  productList: products,
  sortedList: products,
};

const fakeAction = {
  type: "testing initial state",
  payload: {},
};

const addAction = {
  type: "productReducer/addProduct",
  payload: testProduct,
};

const delAction = {
  type: "productReducer/deleteProduct",
  payload: testProduct,
};

const updateAction = {
  type: "productReducer/updateProduct",
  payload: {
    id: "5",
    update: {
      title: "new product updated",
      price: 666,
    },
  },
};

const handler = [
  rest.post("https://api.escuelajs.co/api/v1/products/", (req, res, ctx) => {
    return res(ctx.json([req.body]), ctx.delay(150));
  }),
];

const server = setupServer(...handler);

let store = configureStore({
  reducer: {
    productReducer,
  },
});
beforeEach(() => {
  store = configureStore({
    reducer: {
      productReducer,
    },
  });
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Test action in productReducer", () => {
  test("get initial state", () => {
    const state = productReducer(initialState, fakeAction);
    expect(state.productList.length).toEqual(0);
  });

  test("test add new product", () => {
    store.dispatch(addProduct(testProduct));
    expect(store.getState().productReducer.productList.length).toBe(1);
  });

  test("can update product", () => {
    const state = productReducer(currentState, updateAction);
    const updatedItem = state.productList.find((product) => product.id === "5");
    expect(updatedItem).toBeDefined();
    expect(updatedItem?.title).toEqual(updateAction.payload.update.title);
  });

  test("can delete product", () => {
    const state = productReducer(currentState, delAction);
    store.dispatch(deleteProduct(delAction));
    expect(state.productList.length).toEqual(2);
  });

  test("can fetch products and save to state", async () => {
    await store.dispatch(fetchProducts({ offset: 1, limit: 10 }));
    const state = store.getState().productReducer;
    expect(state.productList.length).toBe(10);
  });

  test("test sorting", () => {
    store.dispatch(sortByCategory("clothes"));
  });

  test("product can be added to API", async () => {
    await store.dispatch(
      addProductToApi({
        title: "Small Wooden Chicken",
        price: 329,
        description:
          "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
        categoryId: 666,
        images: [
          "https://api.lorem.space/image/watch?w=640&h=480&r=7516",
          "https://api.lorem.space/image/watch?w=640&h=480&r=5730",
          "https://api.lorem.space/image/watch?w=640&h=480&r=358",
        ],
      })
    );
    expect(store.getState().productReducer.productList.length).toBe(1);
  });
});
