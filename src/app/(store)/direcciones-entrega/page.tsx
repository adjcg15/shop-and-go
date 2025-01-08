import { Metadata } from "next";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { AddressesListWrapper } from "./_components/AddressListWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mis direcciones de entrega",
};

export default function AddressesPage() {
  return (
    <div className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <header className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Mis direcciones de entrega
        </h1>
      </header>
      <div className="mt-6 w-full flex justify-end mb-8">
        <Link href="/direcciones-entrega/nueva">
          <PrimaryButton>Agregar dirección</PrimaryButton>
        </Link>
      </div>
      <AddressesListWrapper />
    </div>
  );
}
