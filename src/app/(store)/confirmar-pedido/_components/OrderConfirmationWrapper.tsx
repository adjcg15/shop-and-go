"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import StoreContext from "@/contexts/store/context";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { ProductOnCart } from "./ProductOnCart";
import { usePaymentMethods } from "../../../../hooks/usePaymentMethods";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { formatMXNCurrency } from "@/utils/currency";
import { FaArrowDown } from "react-icons/fa";
import { DeliveryTimeMessage } from "./DeliveryTimeMessage";
import { useOrderConfirmation } from "../_hooks/useOrderConfirmation";

export const OrderConfirmationWrapper = () => {
    const {
        handleCreateOrderClick,
        handlePaymentMethodChange,
        isLoadingCreateOrder,
        setPaymentMethod,
    } = useOrderConfirmation();
    const { shoppingCart, nearestStore, deliveryAddress } =
        useContext(StoreContext);
    const { paymentMethods } = usePaymentMethods();
    useEffect(() => {
        if (
            !paymentMethods.loading &&
            !paymentMethods.error &&
            paymentMethods.value.length > 0
        ) {
            setPaymentMethod(paymentMethods.value[0].id.toString());
        }
    }, [paymentMethods, setPaymentMethod]);

    return shoppingCart.length > 0 ? (
        !paymentMethods.loading ? (
            !paymentMethods.error ? (
                <div className="mt-6 flex flex-col items-center">
                    <h2 className="mb-2">Productos agregados</h2>
                    {shoppingCart.map((item) => (
                        <ProductOnCart
                            key={item.product.id}
                            product={item.product}
                            amount={item.totalProducts}
                        />
                    ))}
                    <h3 className="ml-auto mr-2">
                        Total{" "}
                        <span className="text-orange-500">
                            {`${formatMXNCurrency(
                                shoppingCart.reduce(
                                    (total, item) =>
                                        total +
                                        item.product.salePrice *
                                            item.totalProducts,
                                    0
                                )
                            )}`}
                        </span>
                    </h3>
                    <h2 className="mt-6">Método de pago</h2>
                    {paymentMethods.value.length > 0 ? (
                        <div className="mt-2 grid grid-cols-[1fr_auto] gap-x-2 w-full">
                            <select
                                id="paymentMethod"
                                className="text-xs sm:text-sm lg:text-base"
                                defaultValue={paymentMethods.value[0].id}
                                onChange={handlePaymentMethodChange}
                            >
                                {paymentMethods.value.map((method) => (
                                    <option
                                        key={method.id}
                                        value={method.id}
                                        className="text-gray-800"
                                    >
                                        {`${method.bankIssuer}, ${method.endCardNumber}, ${method.cardholderName}`}
                                    </option>
                                ))}
                            </select>
                            <Link href="/metodos-pago/nuevo">
                                <SecondaryButton className="w-min sm:w-fit">
                                    Registrar otro
                                </SecondaryButton>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="mt-2 text-center text-xl">
                                No existen métodos de pago registrados, deberá
                                registrar uno nuevo para poder realizar el
                                pedido
                            </p>
                            <Link href="/metodos-pago/nuevo">
                                <SecondaryButton className="w-min sm:w-fit">
                                    Registrar otro
                                </SecondaryButton>
                            </Link>
                        </>
                    )}
                    <h2 className="mt-12">Datos del envío</h2>
                    <div className="mt-2 w-full text-xs sm:text-sm lg:text-base bg-gray-50 p-4 border border-gray-300">
                        <p className="text-center">
                            {nearestStore.value?.name}
                        </p>
                    </div>
                    <FaArrowDown className="my-2" size={40} />
                    <div className="w-full text-xs sm:text-sm lg:text-base bg-gray-50 p-4 border border-gray-300">
                        <p className="text-center">
                            {`${deliveryAddress?.street}, No. ${deliveryAddress?.streetNumber}, Colonia ${deliveryAddress?.neighborhood}, ${deliveryAddress?.municipality}, ${deliveryAddress?.state}`}
                        </p>
                    </div>
                    <DeliveryTimeMessage />
                    <PrimaryButton
                        className="mt-5 ml-auto"
                        disabled={
                            paymentMethods.value.length === 0 ||
                            isLoadingCreateOrder
                                ? true
                                : false
                        }
                        onClick={handleCreateOrderClick}
                    >
                        {isLoadingCreateOrder
                            ? "Realizando pedido..."
                            : "Realizar pedidio"}
                    </PrimaryButton>
                </div>
            ) : (
                <div className="flex flex-col items-center mt-2">
                    <ErrorBanner
                        image={{
                            src: "/illustrations/server-error.svg",
                            alt: "Ilustración representativa de un error en un servidor",
                        }}
                        title={"¡Error al cargar los métodos de pago!"}
                        message={paymentMethods.error}
                    />
                    <Link href="/catalogo">
                        <PrimaryButton>Continuar comprando</PrimaryButton>
                    </Link>
                </div>
            )
        ) : (
            <div className="col-start-1 col-span-4 mt-2">
                <p className="text-center mt-36 text-2xl">
                    Cargando tus métodos de pago...
                </p>
            </div>
        )
    ) : (
        <div className="flex flex-col items-center mt-2">
            <ErrorBanner
                image={{
                    src: "/illustrations/empty-cart.svg",
                    alt: "Imagen representativa de carrito de productos vacío",
                }}
                title={"¡No tienes productos en pedido por confirmar!"}
                message="Aún no has agregado productos a tu carrito, no hay pedido por confirmar"
            />
            <Link href="/catalogo">
                <PrimaryButton className="m-3">
                    Continuar comprando
                </PrimaryButton>
            </Link>
        </div>
    );
};
