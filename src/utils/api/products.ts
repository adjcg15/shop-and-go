import { ProducCategoriesListResponse } from "@/types/types/api/products";
import shopAndGoAPI from "../axios";
import { ProductCategory } from "@/types/types/model/products";

async function getProductCategories() {
  let productCategories: ProductCategory[] = [];
  let errorLoadingCategories = false;
  
  try {
    const { data: categories } = await shopAndGoAPI.get<ProducCategoriesListResponse>("/product-categories");
    productCategories = categories.map(category => {
      delete category.isActive;
      return category;
    });
  } catch {
    errorLoadingCategories = true;
  }

  return { productCategories, errorLoadingCategories };
}

export {
  getProductCategories
}