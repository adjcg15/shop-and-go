"use client";

import ClientInfo from "./ClientInfo";
import Link from "next/link";
import { FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

export const ClientInfoWrapper = () => {
    return (
        <div className="space-y-8">
            <ClientInfo />
            <div className="mt-8 flex flex-col items-start space-y-4">
                <Link
                    className="text-blue-600 font-medium hover:underline flex items-center"
                    href="/metodos-pago"
                    aria-labelledby="paymentMethodsLink"
                >
                    <FaCreditCard className="mr-2" size={24} />
                    Mis métodos de pago
                </Link>
                <p id="paymentMethodsLink" className="sr-only">
                    Ir a la página de métodos de pago del cliente
                </p>
                <Link
                    aria-labelledby="deliveryAddressesLink"
                    className="text-blue-600 font-medium hover:underline flex items-center"
                    href="/direcciones-entrega"
                >
                    <FaMapMarkerAlt className="mr-2" size={24} />
                    Mis direcciones de entrega
                </Link>
                <p id="deliveryAddressesLink" className="sr-only">
                    Ir a la página de direcciones de entrega del cliente
                </p>
            </div>
        </div>
    );
};
