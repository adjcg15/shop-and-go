import {
    ProductCategoriesListResponse,
    ProductsInStoreResponse,
    ProductsResponse,
} from "@/types/types/api/products";
import shopAndGoAPI from "../axios";
import { Product, ProductCategory } from "@/types/types/model/products";
import { AxiosError, isAxiosError } from "axios";
import UserRoles from "@/types/enums/user_roles";

async function getProductCategories() {
    let productCategories: ProductCategory[] = [];
    let errorLoadingCategories: string | null = null;

    try {
        const { data: categories } =
            await shopAndGoAPI.get<ProductCategoriesListResponse>(
                "/product-categories"
            );
        productCategories = categories;
    } catch (error) {
        errorLoadingCategories =
            "Estamos teniendo problemas para cargar las categorías, por favor intente más tarde.";

        if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
            errorLoadingCategories =
                "No fue posible establecer una conexión para cargar " +
                "la lista de categorías. Verifique que su conexión a Internet es estable o intente más tarde.";
        }
    }

    return { productCategories, errorLoadingCategories };
}

async function getProductsList(
    userRole: UserRoles,
    params: {
        limit?: number;
        offset?: number;
    },
    idStore?: number
) {
    let productList: Product[] = [];
    let errorLoadingProducts: string | null = null;
    try {
        if (userRole === UserRoles.ADMINISTRATOR) {
            const { data: products } = await shopAndGoAPI.get<ProductsResponse>(
                `/products/`,
                { params }
            );
            productList = products;
        } else if (userRole === UserRoles.SALES_EXECUTIVE) {
            const { data: products } =
                await shopAndGoAPI.get<ProductsInStoreResponse>(
                    `/stores/${idStore}/products/`,
                    { params }
                );
            productList = products;
        }
    } catch (error) {
        errorLoadingProducts =
            "Estamos teniendo problemas para cargar las productos, por favor intente más tarde.";

        if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
            errorLoadingProducts =
                "No fue posible establecer una conexión para cargar " +
                "la lista de productos. Verifique que su conexión a Internet es estable o intente más tarde.";
        }
    }

    return { productList, errorLoadingProducts };
}

export { getProductsList, getProductCategories };
