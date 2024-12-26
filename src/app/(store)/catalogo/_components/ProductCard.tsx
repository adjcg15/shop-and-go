import { ProductWithInventory } from "@/types/types/model/products";
import { formatMXNCurrency } from "@/utils/currency";
import Image from "next/image";
import { FC } from "react";

type ProductCardProps = {
  product: ProductWithInventory;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    // TODO: implement redirect to product page when it exists
    <article className="border border-gray-300 rounded-lg overflow-hidden">
      <header className="flex items-center justify-center h-60 bg-gray-50 relative">
        <Image
          src={product.imageUrl}
          alt={`Imagen del producto '${product.name}'`}
          fill
          className="object-contain mix-blend-multiply"
          sizes="100vw, (min-width: 640px) 50vw, (max-width: 1024px) 25vw"
        />
        {
          product.inventory.stock === 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white py-1 px-2 font-medium text-sm rounded-full mt-2 mr-2">Agotado</span>
          )
        }
      </header>
      <main className="px-4 pt-3 pb-5">
        <h1 className="text-base">{product.name}</h1>
        <div className="text-2xl font-bold text-orange-500 mt-2">{formatMXNCurrency(product.salePrice)}</div>
      </main>
    </article>
  );
}
