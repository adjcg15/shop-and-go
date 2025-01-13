import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { CartItem } from "@/types/types/model/products";
import Link from "next/link";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import Image from "next/image";
import { formatMXNCurrency } from "@/utils/currency";
import { useCart } from "../_hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";

interface CartItemsProps {
  items: CartItem[];
}

export const CartItems = ({ items }: CartItemsProps) => {
  const { handleRemoveFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    if (quantity !== item.totalProducts) {
      updateQuantity(item, quantity);
    }
  };

  const onDelete = (id: number) => {
    handleRemoveFromCart(id);
  };

  return (
    <>
      {items.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="flex flex-col sm:flex-row items-center justify-between pb-2"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Image
                  src={item.product.imageUrl}
                  alt={`Imagen del producto ${item.product.name}`}
                  width={100}
                  height={100}
                  className="object-contain w-full sm:w-auto"
                  sizes="(max-width: 640px) 100vw, 100px"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-sm sm:text-base">{item.product.name}</h2>
                  <p className="font-bold text-orange-500 mt-2 sm:mt-6">
                    {formatMXNCurrency(
                      item.product.salePrice * item.totalProducts
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                <select
                  id={`quantity-selector-${item.product.id}`}
                  onChange={(event) =>
                    handleQuantityChange(item, parseInt(event.target.value))
                  }
                  className="p-2 border border-gray-300 rounded-md w-full sm:w-24 md:w-32 lg:w-48"
                  defaultValue={item.totalProducts}
                  aria-describedby="quantitySelectorDescription"
                >
                  {Array.from(
                    {
                      length: Math.min(
                        item.product.maximumAmount,
                        item.product.stock
                      ),
                    },
                    (_, i) => i + 1
                  ).map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
                <p id="quantitySelectorDescription" className="sr-only">
                  Seleccionar una de las opciones de cantidad deseada de ${item.product.name}
                </p>
                <button
                  onClick={() => onDelete(item.product.id)}
                  className="ml-auto p-2"
                  aria-labelledby="deleteItemButtonDescription"
                >
                  <FaTrashAlt
                    className="flex items-center justify-center text-xs sm:text-sm lg:text-base text-gray-800 hover:text-red-500 transition-opacity"
                    size={24}
                  />
                </button>
                <p id="deleteItemButtonDescription" className="sr-only">
                  Eliminar producto del carrito de compras
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-8 items-center space-y-4">
          <ErrorBanner
            image={{
              src: "/illustrations/empty-cart.svg",
              alt: "Carrito vacío",
            }}
            title="¡Tu carrito está vacío!"
            message="Agrega productos a tu carrito de compras para verlos aquí."
          />
          <Link href="/catalogo">
            <PrimaryButton className="m-3">Continuar comprando</PrimaryButton>
          </Link>
        </div>
      )}
    </>
  );
};
