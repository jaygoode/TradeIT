import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducers/productReducer";
import { userReducer } from "../reducers/userReducer";
import { cartReducer } from "../reducers/cartReducer";
import { User } from "../types/user";
import { Cart } from "../types/cart";

let preUser: { currentUser: User | undefined } = { currentUser: undefined };
let preCart: Cart = {
  products: [],
  total: 0,
};
const getUser = localStorage.getItem("user");
const getCart = localStorage.getItem("cart");
if (!!getUser) {
  preUser = JSON.parse(getUser);
}
if (!!getCart) {
  preCart = JSON.parse(getCart);
}
const preloadedState = {
  userReducer: preUser,
  cartReducer: preCart,
};
const saveState = (state: RootState) => {
  try {
    const userReducer = JSON.stringify(state.userReducer);
    const cartReducer = JSON.stringify(state.cartReducer);
    localStorage.setItem("user", userReducer);
    localStorage.setItem("cart", cartReducer);
  } catch (e) {}
};

const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    cartReducer,
  },
  // preloadedState: preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
