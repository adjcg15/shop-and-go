import { Inventory } from "./stores";

type Product = {
  id: number;
  barCode: string;
  name: string;
  description: string;
  imageUrl: string;
  salePrice: number;
  maximumAmount: number;
};

type ProductWithInventory = Product & {
  inventory: Inventory;
};

type CartItem = {
  product: Product;
  totalProducts: number;
};

type ProductCategory = {
  id: number;
  name: string;
  isActive?: boolean;
};

export type {
  Product,
  ProductWithInventory,
  CartItem,
  ProductCategory
};