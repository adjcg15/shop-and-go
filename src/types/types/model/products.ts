import { Inventory } from "./stores";

type Product = {
    id: number;
    barCode: string;
    name: string;
    description: string;
    imageUrl: string;
    salePrice: number;
    isActive: boolean;
    maximumAmount: number;
    idCategory: number;
};

type ProductWithStock = Product & {
    stock: number;
};

type ProductWithInventory = Product & {
    inventory: Inventory;
};

type CartItem = {
    product: ProductWithStock;
    totalProducts: number;
};

type ProductCategory = {
    id: number;
    name: string;
    isActive?: boolean;
};

export type {
    Product,
    ProductWithStock,
    ProductWithInventory,
    CartItem,
    ProductCategory,
};
