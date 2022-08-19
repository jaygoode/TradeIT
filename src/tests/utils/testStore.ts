import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "../../reducers/productReducer";
import { userReducer } from "../../reducers/userReducer";
import { cartReducer } from "../../reducers/cartReducer";

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      productReducer,
      userReducer,
      cartReducer,
    },
  });
  return store;
};

export default createTestStore;
