import { ProductCategory, ProductWithInventory } from "../model/products"

type ProductCategoriesListResponse = ProductCategory[];

type ProductsInStoreResponse = ProductWithInventory[];

export type {
  ProductCategoriesListResponse,
  ProductsInStoreResponse
};