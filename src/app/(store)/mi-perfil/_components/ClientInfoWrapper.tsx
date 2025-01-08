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
                >
                    <FaCreditCard className="mr-2" size={24} />
                    Mis métodos de pago
                </Link>
                <Link
                    className="text-blue-600 font-medium hover:underline flex items-center"
                    href="/direcciones-entrega"
                >
                    <FaMapMarkerAlt className="mr-2" size={24} />
                    Mis direcciones de entrega
                </Link>
            </div>
        </div>
    );
};
