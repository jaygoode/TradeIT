export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface FetchProductsParams {
  offset: number;
  limit: number;
  sorting?: string;
}
