import { Category } from "./category";

export interface Product {
  id: string;
  description: string;
  title: string;
  price: number;
  category: Category;
  images: string[];
}

export interface updateActionType {
  id: string;
  update: Partial<Product>;
}

export interface ProductReducerType {
  productList: Product[];
  sortedList: Product[];
}

export interface ProductPostType {
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
}
