import { Metadata } from "next";
import { AdminProductCategoriesWrapper } from "./_components/AdminProductCategoriesWrapper";

export const metadata: Metadata = {
  title: "Administración de categorías de productos"
};

export default function AdminProductCategoriesPage() {
  return (
    <main className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <AdminProductCategoriesWrapper/>
    </main>
  );
}