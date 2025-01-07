"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { OrderConfirmationWrapperPage } from "./OrderConfirmationWrapper";

export const OrderConfirmation = () => {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}>
            <OrderConfirmationWrapperPage />
        </APIProvider>
    );
};
