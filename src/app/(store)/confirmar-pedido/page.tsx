import { Metadata } from "next";
import { OrderConfirmationWrapperPage } from "./_components/OrderConfirmationWrapper";

export const metadata: Metadata = {
    title: "Confirmación de pedido",
};

export default function OrderConfirmationPage() {
    return (
        <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16 md:grid grid-cols-4 gap-5">
            <div className="col-start-2 col-span-2 flex flex-col items-center">
                <header className="flex flex-col items-center">
                    <h1 className="lg:text-3xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                        Resumen del pedido
                    </h1>
                </header>
                <section className="col-start-2 col-span-2">
                    <OrderConfirmationWrapperPage />
                </section>
            </div>
        </div>
    );
}
