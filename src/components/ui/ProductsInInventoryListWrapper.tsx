"use client";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { ProductsInInventory } from "./ProductsInInventory";
import { useProductsInInventory } from "../../hooks/useProductsInInventory";
import { useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/contexts/auth/context";
import UserRoles from "@/types/enums/user_roles";

export const ProductsInInventoryListWrapper = () => {
    const { productsList, bottomOfProductsListRef } = useProductsInInventory();
    const router = useRouter();
    const employee = useContext(AuthContext);
    const userRole = employee.employeeProfile?.position;

    const handleModify = useCallback(
        (barCode: string) => {
            router.push(
                userRole === UserRoles.ADMINISTRATOR
                    ? `/empleados/productos/${barCode}`
                    : `/empleados/productos-en-tienda/${barCode}`
            );
        },
        [router, userRole]
    );

    return productsList.error ? (
        <div className="col-start-1 col-span-4 mt-2">
            <ErrorBanner
                image={{
                    src: "/illustrations/server-error.svg",
                    alt: "Ilustración representativa de un error en un servidor",
                }}
                title={"¡Problemas técnicos!"}
                message={productsList.error}
            />
        </div>
    ) : (
        <>
            {!productsList.loading && productsList.value.length === 0 && (
                <ErrorBanner
                    image={{
                        src: "/illustrations/empty-cart.svg",
                        alt: "Imagen representativa de un carrito de compras vacío",
                    }}
                    title={"¡No hay productos!"}
                    message="No existen productos registrados, deberá registrar uno nuevo"
                />
            )}
            {productsList.value.length > 0 && (
                <ul className="grid grid-cols-5 gap-4 sm:gap-6 lg:gap-8 bg-gray-300 p-4 border border-slate-500 text-xs sm:text-sm md:text-xs lg:text-lg">
                    <li className="flex justify-center items-center col-span-1 col-start-1">
                        <p className="font-semibold text-gray-800 text-center">
                            Imagen
                        </p>
                    </li>
                    <li className="flex justify-center items-center col-span-3 col-start-2">
                        <p className="font-semibold text-gray-800 text-center ">
                            Nombre
                        </p>
                    </li>
                    <li className="flex justify-center items-center col-span-1 col-start-5">
                        <p className="font-semibold text-gray-800 text-center">
                            Editar
                        </p>
                    </li>
                </ul>
            )}
            {productsList.value.map((product) => (
                <ProductsInInventory
                    key={product.barCode}
                    product={product}
                    onModify={handleModify}
                />
            ))}
            {productsList.loading && (
                <div className="flex justify-center items-center h-full">
                    <p className="text-center mt-36 text-2xl">
                        Cargando productos...
                    </p>
                </div>
            )}
            <div ref={bottomOfProductsListRef} className="h-0"></div>
        </>
    );
};
