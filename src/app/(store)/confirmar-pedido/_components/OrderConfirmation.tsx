"use client";
import { OrderConfirmationWrapperPage } from "./OrderConfirmationWrapper";

export const OrderConfirmation = () => {
    return (
        <>
            <script
                async={true}
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&callback=initialize`}
                defer
            ></script>
            <OrderConfirmationWrapperPage />
        </>
    );
};
