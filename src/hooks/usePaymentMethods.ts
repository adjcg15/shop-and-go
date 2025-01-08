import { useCallback, useContext, useEffect, useState } from "react";
import shopAndGoAPI from "@/utils/axios";
import { NotificationInfo } from "@/types/types/components/notifications";
import { NotificationTypes } from "@/types/enums/notifications";
import { isAxiosError } from "axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { HttpStatusCodes } from "@/types/enums/http";
import { notify } from "@/utils/notifications";
import { PaymentMethod } from "@/types/types/model/payment_methods";
import { DeletePaymentMethodErrorCodes } from "@/types/enums/error_codes";
import AuthContext from "@/contexts/auth/context";
import { PaymentMethodsResponse } from "@/types/types/api/products";

type PaymentMethodsState = {
    loading: boolean;
    value: PaymentMethod[] | [];
    error: null | string;
};

const INITIA_PAYMENT_METHODS_LIST_STATE = {
    loading: false,
    value: [],
    error: null,
};

export function usePaymentMethods() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsState>(
        INITIA_PAYMENT_METHODS_LIST_STATE
    );

    const { clientProfile } = useContext(AuthContext);
    const idClient = clientProfile?.id;

    const getPaymentMethods = useCallback(async () => {
        try {
            setPaymentMethods(() => ({
                loading: true,
                value: [],
                error: null,
            }));

            const { data } = await shopAndGoAPI.get<PaymentMethodsResponse>(
                `/clients/${idClient}/payment-methods`
            );

            setPaymentMethods(() => ({
                loading: false,
                value: data,
                error: null,
            }));
        } catch (error) {
            let errorMessage =
                "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";

            if (
                isAxiosError(error) &&
                isClientErrorHTTPCode(Number(error.response?.status)) &&
                error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
            ) {
                errorMessage =
                    "No se pudieron obtener los métodos de pago porque el cliente no se pudo identificar";
            }

            setPaymentMethods(() => ({
                loading: false,
                value: [],
                error: errorMessage,
            }));
        }
    }, [idClient]);

    const deletePaymentMethod = useCallback(
        async (id: number) => {
            try {
                await shopAndGoAPI.delete(
                    `/clients/${idClient}/payment-methods/${id}`
                );

                setPaymentMethods((previousMethodsState) => ({
                    ...previousMethodsState,
                    value: previousMethodsState.value!.filter(
                        (method) => method.id !== id
                    ),
                }));
            } catch (error) {
                const notificationInfo: NotificationInfo = {
                    title: "Servicio no disponible",
                    message:
                        "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
                    type: NotificationTypes.ERROR,
                };

                if (
                    isAxiosError(error) &&
                    isClientErrorHTTPCode(Number(error.response?.status)) &&
                    error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
                ) {
                    const errorCode = error.response?.data?.errorCode;
                    if (
                        errorCode ===
                        DeletePaymentMethodErrorCodes.CLIENT_NOT_FOUND
                    ) {
                        notificationInfo.title = "Cliente incorrecto";
                        notificationInfo.message =
                            "No se pudieron obtener los métodos de pago porque el cliente no se pudo identificar";
                        notificationInfo.type = NotificationTypes.ERROR;
                    } else {
                        notificationInfo.title = "Método de pago no encontrado";
                        notificationInfo.message =
                            "No se pudo eliminar el método de pago porque no se encontró en el sistema";
                        notificationInfo.type = NotificationTypes.ERROR;
                    }
                }

                notify(notificationInfo);
            }
        },
        [idClient]
    );

    useEffect(() => {
        getPaymentMethods();
    }, [getPaymentMethods]);

    return {
        paymentMethods,
        deletePaymentMethod,
    };
}
