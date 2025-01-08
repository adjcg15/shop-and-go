"use client";
import { CreateEmployeeErrorCodes } from "@/types/enums/error_codes";
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

type EmployeeForm = {
    fullName: string;
    registrationDate: string;
    user: string;
    password: string;
    position: string;
    store: string;
}

const INITIAL_EMPLOYEE_FORM = {
    fullName: "",
    registrationDate: "",
    user: "",
    password: "",
    position: "",
    store: ""
}

export function useEmployeeForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit: submitWrapper,
        formState: { errors },
    } = useForm<EmployeeForm>({
        defaultValues: INITIAL_EMPLOYEE_FORM
    });

    const onSubmit: SubmitHandler<EmployeeForm> = async (
        {
            fullName,
            registrationDate,
            user,
            password,
            position,
            store
        }
    ) => {
        setIsLoadingRegister(true);

        fullName = fullName.trim();
        registrationDate = registrationDate.trim();
        user = user.trim();
        password = password.trim();

        const requestBody = {
            fullName,
            user,
            password,
            registrationDate,
            idStore: Number(store),
            idPosition: Number(position),
        }

        try {
            await shopAndGoAPI.post(
                "employees",
                requestBody
            );

            const notificationInfo: NotificationInfo = {
                title: "Cuenta registrada",
                message: "La cuenta del trabajador ha sido registrada exitosamente",
                type: NotificationTypes.SUCCESS,
            };

            notify(notificationInfo);
            router.push("/empleados/personal");

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

                if (errorCode === CreateEmployeeErrorCodes.EMPLOYEE_ALREADY_EXISTS) {
                    notificationInfo.title = "Cuenta ya existente";
                    notificationInfo.message = "No se pudo crear la cuenta porque ya existe una cuenta con este usuario";
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
        errors,
        register,
        handleSubmit,
        isLoadingRegister,
        setShowPassword,
    }
}