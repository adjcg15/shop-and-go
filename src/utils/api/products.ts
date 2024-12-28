import { ProductCategoriesListResponse } from "@/types/types/api/products";
import shopAndGoAPI from "../axios";
import { ProductCategory } from "@/types/types/model/products";
import { AxiosError, isAxiosError } from "axios";

async function getProductCategories() {
  let productCategories: ProductCategory[] = [];
  let errorLoadingCategories: string | null = null;
  
  try {
    const { data: categories } = await shopAndGoAPI.get<ProductCategoriesListResponse>("/product-categories");
    productCategories = categories;
  } catch(error) {
    errorLoadingCategories = "Estamos teniendo problemas para cargar las categorías, por favor intente más tarde.";
            
    if(isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
      errorLoadingCategories = "No fue posible establecer una conexión para cargar "
      + "la lista de categorías. Verifique que su conexión a Internet es estable o intente más tarde."
    }
  }

  return { productCategories, errorLoadingCategories };
}

export {
  getProductCategories
}