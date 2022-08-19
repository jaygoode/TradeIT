import { Product } from "./product";

export interface ProductsInCart extends Product {
  quantity: number;
}

export interface Cart {
  products: ProductsInCart[];
  total: number;
}
