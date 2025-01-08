"use client";
import { ProductForm } from "../forms/ProductForm";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { useProductToModify } from "../../hooks/useProductToModify";

export const ProductToModifyWrapper = () => {
    const { product, inventories } = useProductToModify();
    return (
        <div className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16 md:grid grid-cols-4 gap-5">
            {!product.error && !inventories.error ? (
                !product.loading && !inventories.loading ? (
                    product.value &&
                    inventories.value && (
                        <div className="col-start-2 col-span-2 flex flex-col items-center">
                            <header className="flex flex-col items-center">
                                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                                    Modificar de producto
                                </h1>
                            </header>
                            <ProductForm
                                product={product.value}
                                inventories={inventories.value}
                            />
                        </div>
                    )
                ) : (
                    <div className="col-start-1 col-span-4 mt-2">
                        <p className="text-center mt-36 text-2xl">
                            Cargando información del producto y su inventario...
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
                        message="No se pudo cargar la información del producto y su inventario"
                    />
                </div>
            )}
        </div>
    );
};
