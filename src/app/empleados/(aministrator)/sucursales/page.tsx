import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Metadata } from "next";
import Link from "next/link";
import { StoresList } from "./_components/StoresList";

export const metadata: Metadata = {
    title: "Administración de sucursales",
};

export default function AdminStoresPage() {
    return (
        <main className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
            <section className="flex justify-end">
                <Link href="/empleados/sucursales/nueva" className="p-0 m-0">
                <PrimaryButton aria-describedby="registerNewStoreButtonDescription">Registrar sucursal</PrimaryButton>
                <p className="sr-only" id="registerNewStoreButtonDescription">Mostrar la ventana para registrar una nueva sucursal en el sistema</p>
                </Link>
            </section>
            
            <section className="mt-5">
                <h1>Sucursales registradas</h1>
                <StoresList/>
            </section>
        </main>
    );
}