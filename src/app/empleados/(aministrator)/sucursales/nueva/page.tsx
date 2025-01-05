import { Metadata } from "next";
import { CreateStoreForm } from "./_components/CreateStoreForm";

export const metadata: Metadata = {
  title: "Crear sucursal",
};

export default function createStorePage() {
  return (
    <main className="mx-auto max-w-lg px-5 pt-8 pb-16">
      <h1>Nueva sucursal</h1>
      <CreateStoreForm/>
    </main>
  );
}