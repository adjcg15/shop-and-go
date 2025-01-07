"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import StoreContext from "@/contexts/store/context";

type DeliveryTimeState = {
    loading: boolean;
    value: string | null;
    error: string | null;
};

const INITIA_DELIVERY_TIME_STATE = {
    loading: false,
    value: null,
    error: null,
};

export const DeliveryTimeMessage = () => {
    const { nearestStore, deliveryAddress } = useContext(StoreContext);
    const [deliveryTime, setDeliveryTime] = useState<DeliveryTimeState>(
        INITIA_DELIVERY_TIME_STATE
    );

    const calculateDistanceBetweenAddresses = useCallback(() => {
        setDeliveryTime({
            loading: true,
            value: null,
            error: null,
        });

        const origin = {
            lat: nearestStore.value!.latitude,
            lng: nearestStore.value!.longitude,
        };
        const destination = {
            lat: deliveryAddress!.latitude,
            lng: deliveryAddress!.longitude,
        };

        const distanceMatrixService = new google.maps.DistanceMatrixService();

        distanceMatrixService.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                language: "es",
            },
            (response, status) => {
                if (
                    status === google.maps.DistanceMatrixStatus.OK &&
                    response
                ) {
                    const duration = response.rows[0].elements[0].duration.text;

                    if (duration) {
                        setDeliveryTime({
                            loading: false,
                            value: duration,
                            error: null,
                        });
                    } else {
                        setDeliveryTime({
                            loading: false,
                            value: null,
                            error: "No se pudo calcular el tiempo de entrega",
                        });
                    }
                } else {
                    setDeliveryTime({
                        loading: false,
                        value: null,
                        error: "No se pudo calcular el tiempo de entrega",
                    });
                }
            }
        );
    }, [deliveryAddress, nearestStore.value]);

    useEffect(() => {
        calculateDistanceBetweenAddresses();
    }, [calculateDistanceBetweenAddresses]);

    return (
        <div className="mt-2 flex items-center justify-center text-center">
            {!deliveryTime.loading ? (
                !deliveryTime.error ? (
                    <p>
                        El tiempo estimado de entrega es de{" "}
                        <span>{deliveryTime.value}</span> después de que el
                        pedido salga de la sucursal al domicilio
                    </p>
                ) : (
                    <p>
                        No fue posible calcular el tiempo de entrega por razones
                        externas al sistema
                    </p>
                )
            ) : (
                <p>Calculando tiempo de entrega...</p>
            )}
        </div>
    );
};
