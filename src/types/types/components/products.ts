import { ProductCategory } from "../model/products";

type CategoriesListState = {
  loading: boolean; 
  value: ProductCategory[]; 
  error: null | string;
};

export type {
  CategoriesListState
};