import { getProductCategories } from "@/utils/api/products";
import { Metadata } from "next";
import { ProductCategoriesList } from "./_components/ProductCategoriesList";
import { DeliveryAddress } from "./_components/DeliveryAddress";

export const metadata: Metadata = {
  title: "Catálogo de productos"
};

export default async function ProductCatalogPage() {
  const { productCategories } = await getProductCategories();
  
  return (
    <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 md:grid grid-cols-4 gap-5">
      <aside>
        <DeliveryAddress />
        <ProductCategoriesList productCategories={productCategories}/>
      </aside>
      <main className="col-span-3">
        <h1>Página del CATÁLOGO DE PRODUCTOS: Próximamente</h1>
      </main>
    </div>
  );
}