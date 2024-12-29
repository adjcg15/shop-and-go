import { Metadata } from "next";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ListWrapper } from "./_components/ListWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Métodos de pago del cliente",
};

export default function PaymentMethodsPage() {
  return (
    <div className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <header className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Mis métodos de pago
        </h1>
        <div className="mt-6 w-full flex justify-end">
          <Link href="metodos-pago/nuevo">
            <PrimaryButton>Registrar otra tarjeta</PrimaryButton>
          </Link>
        </div>
      </header>
      <ListWrapper />
    </div>
  );
}
