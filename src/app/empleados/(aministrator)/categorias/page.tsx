import { Metadata } from "next";
import { CreateCategorySection } from "./_components/CreateCategorySection";
import { CategoriesList } from "./_components/CategoriesList";

export const metadata: Metadata = {
  title: "Administración de categorías de productos"
};

export default function AdminProductsPage() {
  return (
    <main className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <CreateCategorySection/>
      
      <section className="mt-6">
        <h1>Categorías de productos registradas</h1>
        <CategoriesList/>
      </section>
    </main>
  );
}