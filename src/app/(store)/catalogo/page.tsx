import { getProductCategories } from "@/utils/api/products";
import { Metadata } from "next";
import { ProductCategoriesList } from "./_components/ProductCategoriesList";
import { DeliveryAddress } from "./_components/DeliveryAddress";
import { ProductsSearchbar } from "./_components/ProductsSearchbar";
import { DEFAULT_PRODUCT_CATEGORY } from "@/utils/constants";
import { ProductsSection } from "./_components/ProductsSection";

export const metadata: Metadata = {
  title: "Catálogo de productos"
};

export default async function ProductCatalogPage() {
  const { productCategories } = await getProductCategories();
  const productCategoriesWithDefault = [DEFAULT_PRODUCT_CATEGORY, ...productCategories];
  
  return (
    <div className="px-3 md:px-12 max-w-screen-2xl mx-auto py-8 md:grid grid-cols-4 gap-5">
      <aside>
        <DeliveryAddress />
        <ProductCategoriesList productCategories={productCategoriesWithDefault}/>
      </aside>
      <main className="col-span-3">
        <ProductsSearchbar />
        <ProductsSection productCategories={productCategoriesWithDefault}/>
      </main>
    </div>
  );
}