import { Metadata } from "next";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { PaymentMethodListWrapper } from "./_components/PaymentMethodsListWrapper";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Métodos de pago del cliente",
};

export default function PaymentMethodsPage() {
    return (
        <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16 md:grid grid-cols-4 gap-5">
            <header className="flex flex-col items-center col-start-2 col-span-2 md:col-span-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Mis métodos de pago
                </h1>
            </header>
            <section className="col-start-4 mt-4 col-span-1 flex justify-end md:col-span-4">
                <Link href="metodos-pago/nuevo">
                    <PrimaryButton>Registrar otra tarjeta</PrimaryButton>
                </Link>
            </section>
            <section className="col-start-1 col-span-4 mt-2">
                <PaymentMethodListWrapper />
            </section>
        </div>
    );
}
