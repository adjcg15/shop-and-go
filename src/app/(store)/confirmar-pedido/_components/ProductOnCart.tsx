import { formatMXNCurrency } from "@/utils/currency";
import Image from "next/image";
import { FC } from "react";

type ProductOnCartProps = {
    product: {
        id: number;
        imageUrl: string;
        name: string;
        salePrice: number;
    };

    amount: number;
};

export const ProductOnCart: FC<ProductOnCartProps> = ({ product, amount }) => {
    return (
        <ul
            key={product.id}
            className="w-full grid grid-cols-5 gap-4 sm:gap-6 lg:gap-8 bg-gray-50 p-4 border border-gray-300"
        >
            <li className="flex justify-center items-center col-span-1 col-start-1">
                <Image
                    src={product.imageUrl}
                    alt={`Imagen del producto '${product.name}'`}
                    width={60}
                    height={60}
                    className="object-contain"
                />
            </li>
            <li className="flex justify-center items-center col-span-2 col-start-2">
                <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                    {product.name}
                </p>
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-4">
                <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                    {amount > 1 ? `${amount} unidades` : "1 unidad"}
                </p>
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-5">
                <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                    {`${formatMXNCurrency(product.salePrice * amount)}`}
                </p>
            </li>
        </ul>
    );
};
