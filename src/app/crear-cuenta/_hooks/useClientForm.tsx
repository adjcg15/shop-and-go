"use client";
import { CreateClientErrorCodes } from "@/types/enums/error_codes";
import { HttpStatusCodes } from "@/types/enums/http";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ClientForm = {
    fullName: string;
    phoneNumber: string;
    birthdate: string;
    password: string;
    passwordConfirmation: string;
}

const INITIAL_CLIENT_FORM = {
    fullName: "",
    phoneNumber: "",
    birthdate: "",
    password: "",
    passwordConfirmation: "",
}

export function useClientForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit: submitWrapper,
        formState: { errors },
        watch,
    } = useForm<ClientForm>({
        defaultValues: INITIAL_CLIENT_FORM
    });

    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");

    function validateBirthdate(value: string): string | true {
        const birthDate = new Date(value);
        const today = new Date();
    
        if (birthDate > today) {
            return "La fecha de nacimiento no puede ser futura.";
        }
    
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 || 
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age -= 1;
        }
    
        if (age < 18) {
            return "Debes tener al menos 18 años.";
        }
    
        if (age > 120) {
            return "Edad inválida. Ingresa una edad válida (menos de 120 años).";
        }
    
        return true;
    }

    const onSubmit: SubmitHandler<ClientForm> = async (
        {
            fullName,
            phoneNumber,
            birthdate,
            password,
        }
    ) => {
        setIsLoadingRegister(true);

        fullName = fullName.trim();
        phoneNumber = phoneNumber.trim();
        birthdate = birthdate.trim();
        password = password.trim();

        const requestBody = {
            fullName,
            phoneNumber,
            birthdate,
            password,
        };

        try {
            await shopAndGoAPI.post(
                "clients",
                requestBody
            );

            const notificationInfo: NotificationInfo = {
                title: "Cuenta registrada",
                message: "La cuenta ha sido registrada exitosamente",
                type: NotificationTypes.SUCCESS,
            };

            notify(notificationInfo);
            router.push("/iniciar-sesion");

        } catch (error) {
            const notificationInfo: NotificationInfo = {
                title: "Servicio no disponible",
                message: "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
                type: NotificationTypes.ERROR,
            };

            if (
                isAxiosError(error) &&
                isClientErrorHTTPCode(Number(error.response?.status)) &&
                error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
            ) {
                const errorCode = error.response?.data?.errorCode;

                if (errorCode === CreateClientErrorCodes.CLIENT_ALREADY_EXISTS) {
                    notificationInfo.title = "Cuenta ya existente";
                    notificationInfo.message = "No se pudo crear la cuenta porque ya existe una cuenta con este número de teléfono";
                    notificationInfo.type = NotificationTypes.WARNING;
                }
            }

            notify(notificationInfo);

        } finally {
            setIsLoadingRegister(false);
        }
    };

    const handleSubmit = submitWrapper(onSubmit);

    return {
        showPassword,
        showPasswordConfirmation,
        errors,
        register,
        handleSubmit,
        isLoadingRegister,
        setShowPassword,
        setShowPasswordConfirmation,
        password,
        passwordConfirmation,
        validateBirthdate
    }
}