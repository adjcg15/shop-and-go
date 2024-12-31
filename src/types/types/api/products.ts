import { PaymentMethod } from "../model/payment_methods";
import {
    Product,
    ProductCategory,
    ProductWithInventory,
} from "../model/products";

type ProductsResponse = Product[];

type PaymentMethodsResponse = PaymentMethod[];

type ProductCategoriesListResponse = ProductCategory[];

type ProductsInStoreResponse = ProductWithInventory[];

export type {
    ProductsResponse,
    PaymentMethodsResponse,
    ProductCategoriesListResponse,
    ProductsInStoreResponse,
};
