import { ProductInformation } from "./_components/ProductInformation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Información de producto",
};

const ProductPage = () => {
    return (
        <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16 md:grid grid-cols-4 gap-5">
            <ProductInformation />
        </div>
    );
};

export default ProductPage;
