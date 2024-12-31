"use client";
import { useParams } from "next/navigation";
import { ProductWithStock } from "@/types/types/model/products";
import { useCallback, useContext, useEffect, useState } from "react";
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
                console.log(barCode);
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
                            <h1 className="text-3xl sm:text-5xl font-bold">
                                {productWithStock.value.name}
                            </h1>
                            <p className="text-2xl sm:text-4xl font-bold text-orange-500 mt-6">
                                {formatMXNCurrency(
                                    productWithStock.value.salePrice!
                                )}
                            </p>
                            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mt-8">
                                Descripción
                            </h1>
                            <p className="text-lg sm:text-2xl text-gray-800 mt-4">
                                {productWithStock.value.description}
                            </p>
                            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mt-8">
                                Disponibilidad
                            </h1>
                            <p className="text-lg sm:text-2xl text-gray-800 mt-4">
                                {productWithStock.value.stock > 0
                                    ? `${productWithStock.value.stock} unidades disponibles`
                                    : "Producto agotado"}
                            </p>
                        </main>
                        <section className="col-start-4 mt-4 col-span-1 flex justify-end md:col-span-4">
                            <PrimaryButton>
                                <div className="flex items-center">
                                    <span>Agregar producto al carrito</span>
                                    <FaCartShopping className="ml-2" />
                                </div>
                            </PrimaryButton>
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
