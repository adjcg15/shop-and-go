"use client";
import AuthContext from "@/contexts/auth/context";
import { useState, useMemo, useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { NotificationInfo } from "@/types/types/components/notifications";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { HttpStatusCodes } from "@/types/enums/http";
import { NotificationTypes } from "@/types/enums/notifications";
import { isClientErrorHTTPCode } from "@/utils/http";
import shopAndGoAPI from "@/utils/axios";
import { IssuerBank } from "@/types/types/model/issuing_banks";
import { CreatePaymentMethodErrorCodes } from "@/types/enums/error_codes";

type IussingBanksState = {
    loading: boolean;
    value: IssuerBank[];
    error: string | null;
};

type PaymentMethodForm = {
    cardholderName: string;
    cardNumber: string;
    bankIssuer: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
};

const INITIA_ISSUING_BANKS_LIST_STATE = {
    loading: false,
    value: [],
    error: null,
};

export function usePaymentMethodForm() {
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [issuerColor, setIssuerColor] = useState("text-gray-400");
    const [issuingBanks, setIssuingBanks] = useState<IussingBanksState>(
        INITIA_ISSUING_BANKS_LIST_STATE
    );

    const FORM_INITIAL_VALUES = useMemo(
        () => ({
            cardholderName: "",
            cardNumber: "",
            bankIssuer: "",
            expirationMonth: "",
            expirationYear: "",
            cvv: "",
        }),
        []
    );

    const {
        register,
        handleSubmit: submitWrapper,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: FORM_INITIAL_VALUES,
    });

    const { clientProfile } = useContext(AuthContext);
    const idClient = clientProfile?.id;

    const router = useRouter();

    const getIssuingBanks = useCallback(async () => {
        setIssuingBanks(() => ({
            loading: true,
            value: [],
            error: null,
        }));
        try {
            const { data } = await shopAndGoAPI.get<IssuerBank[]>(
                "/issuing-banks"
            );
            setIssuingBanks(() => ({
                loading: false,
                value: data,
                error: null,
            }));
        } catch {
            const errorMessage =
                "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";
            setIssuingBanks(() => ({
                loading: false,
                value: [],
                error: errorMessage,
            }));
        }
    }, []);

    useEffect(() => {
        getIssuingBanks();
    }, [getIssuingBanks]);

    const onSubmit: SubmitHandler<PaymentMethodForm> = async ({
        cardholderName,
        cardNumber,
        bankIssuer,
        expirationMonth,
        expirationYear,
    }) => {
        setIsLoadingRegister(true);

        cardholderName = cardholderName.trim();
        cardNumber = cardNumber.trim();
        expirationMonth = expirationMonth.trim();
        expirationYear = expirationYear.trim();

        const requestBody = {
            idClient,
            cardholderName,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            idIssuer: bankIssuer,
            cardNumber,
        };

        try {
            await shopAndGoAPI.post(
                `clients/${idClient}/payment-methods`,
                requestBody
            );
            const notificationInfo: NotificationInfo = {
                title: "Método de pago registrado",
                message: "El método de pago ha sido registrado exitosamente",
                type: NotificationTypes.SUCCESS,
            };
            notify(notificationInfo);
            setIsLoadingRegister(false);

            router.push("/metodos-pago");
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
                    errorCode === CreatePaymentMethodErrorCodes.CLIENT_NOT_FOUND
                ) {
                    notificationInfo.title = "Cliente incorrecto";
                    notificationInfo.message =
                        "No se pudieron obtener los métodos de pago porque el cliente no se pudo identificar";
                    notificationInfo.type = NotificationTypes.WARNING;
                } else if (
                    errorCode === CreatePaymentMethodErrorCodes.ISSUER_NOT_FOUND
                ) {
                    notificationInfo.title = "Banco emisor no encontrado";
                    notificationInfo.message =
                        "No se pudo crear el método de pago porque no se encontró el banco emisor en el sistema";
                    notificationInfo.type = NotificationTypes.WARNING;
                } else if (
                    errorCode ==
                    CreatePaymentMethodErrorCodes.PAYMENT_METHOD_ALREADY_EXISTS
                ) {
                    notificationInfo.title = "Método de pago ya existente";
                    notificationInfo.message =
                        "No se pudo crear el método de pago porque usted ya lo tiene registrado en el sistema";
                    notificationInfo.type = NotificationTypes.WARNING;
                }
            }

            notify(notificationInfo);
        } finally {
            setIsLoadingRegister(false);
        }
    };

    const handleSubmit = submitWrapper(onSubmit);

    const handleIssuerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValue("bankIssuer", selectedValue);
        setIssuerColor(selectedValue ? "text-gray-800" : "text-gray-400");
    };

    return {
        register,
        errors,
        handleSubmit,
        isLoadingRegister,
        handleIssuerChange,
        issuingBanks,
        issuerColor,
    };
}
