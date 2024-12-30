import { PaymentMethodForm } from "./_components/PaymentMethodForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registro de un nuevo método de pago",
};

export default function Login() {
    return (
        <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16 md:grid grid-cols-4 gap-5">
            <div className="col-start-2 col-span-2 flex flex-col items-center">
                <header className="flex flex-col items-center">
                    <h1 className="lg:text-3xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                        Registro de tarjeta
                    </h1>
                </header>
                <PaymentMethodForm />
            </div>
        </div>
    );
}
