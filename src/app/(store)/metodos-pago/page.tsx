import { Metadata } from "next";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ListWrapper } from "./_components/ListWrapper";

export const metadata: Metadata = {
  title: "Métodos de pago del cliente",
};

export default function PaymentMethodsPage() {
  return (
    <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8">
      <header className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Mis métodos de pago
        </h1>
        <div className="mt-6 w-full flex justify-end">
          <PrimaryButton>Registrar otra tarjeta</PrimaryButton>
        </div>
      </header>
      <ListWrapper />
    </div>
  );
}
