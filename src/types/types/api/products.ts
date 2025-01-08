import { PaymentMethod } from "../model/payment_methods";
import {
    Product,
    ProductCategory,
    ProductWithInventory,
} from "../model/products";
import { Store } from "../model/stores";

type ProductsResponse = Product[];

type PaymentMethodsResponse = PaymentMethod[];

type StoresListResponse = Store[];

type ProductCategoriesListResponse = ProductCategory[];

type ProductsInStoreResponse = ProductWithInventory[];

export type {
    ProductsResponse,
    PaymentMethodsResponse,
    StoresListResponse,
    ProductCategoriesListResponse,
    ProductsInStoreResponse,
};
