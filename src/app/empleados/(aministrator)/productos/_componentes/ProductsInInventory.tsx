"use client";
import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";

type ProductProps = {
    product: {
        id: number;
        barCode: string;
        name: string;
        imageUrl: string;
    };
    onModify: (barCode: string) => void;
};

export const ProductsInInventory: FC<ProductProps> = ({
    product,
    onModify,
}) => {
    return (
        <ul
            key={product.barCode}
            className="grid grid-cols-5 gap-4 sm:gap-6 lg:gap-8 bg-gray-50 p-4 border border-gray-300"
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
            <li className="flex justify-center items-center col-span-3 col-start-2">
                <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                    {product.name}
                </p>
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-5">
                <button
                    className="flex items-center justify-center text-lg sm:text-xl lg:text-2xl text-gray-800 hover:text-red-500 p-4"
                    onClick={() => onModify(product.barCode)}
                >
                    <FaRegEdit width={80} height={80} />
                </button>
            </li>
        </ul>
    );
};
