import { Metadata } from "next";
import { ProductForm } from "./_components/ProductForm";

export const metadata: Metadata = {
    title: "Registro de un nuevo producto",
};

export default function ProductPage() {
    return (
        <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16 md:grid grid-cols-4 gap-5">
            <div className="col-start-2 col-span-2 flex flex-col items-center">
                <header className="flex flex-col items-center">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                        Registro de producto
                    </h1>
                </header>
                <ProductForm />
            </div>
        </div>
    );
}
