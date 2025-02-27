"use client";
import { useParams } from "next/navigation";
import { ProductWithStock } from "@/types/types/model/products";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { formatMXNCurrency } from "@/utils/currency";
import Image from "next/image";
import shopAndGoAPI from "@/utils/axios";
import StoreContext from "@/contexts/store/context";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { isAxiosError } from "axios";
import { HttpStatusCodes } from "@/types/enums/http";
import { isClientErrorHTTPCode } from "@/utils/http";
import { FaCartShopping } from "react-icons/fa6";
import { GetProductWithStockInStoreErrorCodes } from "@/types/enums/error_codes";
import { notify } from "@/utils/notifications";
import { NotificationTypes } from "@/types/enums/notifications";

type ProductWithStockState = {
    loading: boolean;
    value: ProductWithStock | null;
    error: string | null;
};

const INITIAL_PRODUCT_WITH_STOCK_STATE = {
    loading: false,
    value: null,
    error: null,
};

export const ProductInformation = () => {
    const { barCode } = useParams();
    const validatedBarCode = Array.isArray(barCode) ? barCode[0] : barCode;
    const [productWithStock, setProductWithStock] =
        useState<ProductWithStockState>(INITIAL_PRODUCT_WITH_STOCK_STATE);
    const Store = useContext(StoreContext);
    const idStore = Store?.nearestStore.value?.id;
    const addToCart = Store.addToCart;
    const quantityRef = useRef<HTMLSelectElement>(null);

    const loadProduct = useCallback(
        async (barCode: string) => {
            setProductWithStock({
                loading: true,
                value: null,
                error: null,
            });

            let errorMessage =
                "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";

            try {
                const { data } = await shopAndGoAPI.get<ProductWithStock>(
                    `/stores/${idStore}/products/${barCode}`
                );
                setProductWithStock(() => ({
                    loading: false,
                    value: data,
                    error: null,
                }));
            } catch (error) {
                if (
                    isAxiosError(error) &&
                    isClientErrorHTTPCode(Number(error.response?.status)) &&
                    error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
                ) {
                    const errorCode = error.response?.data?.errorCode;
                    if (
                        errorCode ===
                        GetProductWithStockInStoreErrorCodes.STORE_NOT_FOUND
                    ) {
                        errorMessage =
                            "La tienda no se pudo identificar correctamente, por lo que no se pudo cargar la información del producto";
                    } else if (
                        errorCode ===
                        GetProductWithStockInStoreErrorCodes.PRODUCT_NOT_FOUND
                    ) {
                        errorMessage =
                            "El producto no se ha podido cargar, no se encontró con el código de barras asignado en el sistema";
                    } else if (
                        errorCode ==
                        GetProductWithStockInStoreErrorCodes.INVENTORY_DOES_NOT_EXIST
                    ) {
                        errorMessage =
                            "No se ha encontrado un inventario existente del producto en la tienda";
                    }
                }
                setProductWithStock(() => ({
                    loading: false,
                    value: null,
                    error: errorMessage,
                }));
            }
        },
        [idStore]
    );

    useEffect(() => {
        const getProduct = async () => {
            if (validatedBarCode) {
                await loadProduct(validatedBarCode);
            }
        };

        getProduct();
    }, [loadProduct, validatedBarCode]);

    const handleAddToCart = () => {
        if (productWithStock.value) {
            const quantity = Number(quantityRef.current?.value);
            addToCart({
                product: productWithStock.value,
                totalProducts: quantity,
            });

            notify({
                title: "Producto agregado al carrito",
                message: `Se ha agregado ${quantity} ${
                    quantity > 1 ? "unidades" : "unidad"
                } de '${productWithStock.value.name}' al carrito`,
                type: NotificationTypes.SUCCESS,
            });
        }
    };

    return !productWithStock.error ? (
        !productWithStock.loading ? (
            productWithStock.value && (
                <>
                    <div className="col-span-4 md:col-span-2 p-4 max-w-3xl mx-auto">
                        <header className="flex items-center justify-center mb-6">
                            <Image
                                src={productWithStock.value.imageUrl}
                                alt={`Imagen del producto '${productWithStock.value!
                                    .name!}'`}
                                width={400}
                                height={400}
                                className="object-contain"
                            />
                        </header>
                    </div>
                    <div className="col-span-4 md:col-span-2 p-4 max-w-3xl mx-auto">
                        <main>
                            <h1 className="text-xl sm:text-3xl font-bold">
                                {productWithStock.value.name}
                            </h1>
                            <p className="text-xl sm:text-3xl font-bold text-orange-500 mt-6">
                                {formatMXNCurrency(
                                    productWithStock.value.salePrice!
                                )}
                            </p>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mt-8">
                                Descripción
                            </h1>
                            <p className="text-base sm:text-xl text-gray-800 mt-4">
                                {productWithStock.value.description}
                            </p>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mt-8">
                                Disponibilidad
                            </h1>
                            <p className="text-base sm:text-xl text-gray-800 mt-4">
                                {productWithStock.value.stock > 0
                                    ? `${productWithStock.value.stock} unidades disponibles`
                                    : "Producto agotado"}
                            </p>
                        </main>
                        <section className="col-start-4 mt-4 col-span-1 flex flex-col items-end md:col-span-4">
                            <label
                                htmlFor="quantity-selector"
                                className="text-sm font-medium text-gray-800 mb-2"
                            >
                                Cantidad
                            </label>
                            <select
                                id="quantity-selector"
                                ref={quantityRef}
                                className="p-2 border border-gray-300 rounded-md w-48"
                                defaultValue={1}
                                aria-describedby="quantitySelect"
                            >
                                {Array.from(
                                    {
                                        length: Math.min(
                                            productWithStock.value
                                                ?.maximumAmount || 0,
                                            productWithStock.value?.stock || 0
                                        ),
                                    },
                                    (_, i) => i + 1
                                ).map((quantity) => (
                                    <option key={quantity} value={quantity}>
                                        {quantity}
                                    </option>
                                ))}
                            </select>
                            <p id="quantitySelect" className="sr-only">
                                Selecciona la cantidad de productos {productWithStock.value.name} a agregar al
                                carrito
                            </p>
                        </section>
                        <section className="col-start-4 mt-4 col-span-1 flex justify-end md:col-span-4">
                            <PrimaryButton
                                onClick={handleAddToCart}
                                aria-labelledby="addToCartButton"
                                disabled={
                                    productWithStock.value.stock > 0
                                        ? false
                                        : true
                                }
                            >
                                <div className="flex items-center">
                                    <span>Agregar producto al carrito</span>
                                    <FaCartShopping className="ml-2" />
                                </div>
                            </PrimaryButton>
                            <p id="addToCartButton" className="sr-only">
                                Agregar producto al carrito, si el producto ya está en carrito se reemplazarán las unidades con las seleccionadas
                            </p>
                        </section>
                    </div>
                </>
            )
        ) : (
            <div className="col-start-1 col-span-4 mt-2">
                <p className="text-center mt-36 text-2xl">
                    Cargando información del producto...
                </p>
            </div>
        )
    ) : (
        <div className="col-start-1 col-span-4 mt-2">
            <ErrorBanner
                image={{
                    src: "/illustrations/empty-cart.svg",
                    alt: "Imagen representativa de un producto no encontrado",
                }}
                title={"¡Error al cargar la información del producto!"}
                message={productWithStock.error}
            />
        </div>
    );
};
