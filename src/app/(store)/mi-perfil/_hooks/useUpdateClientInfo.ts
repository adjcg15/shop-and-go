"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { isAxiosError } from "axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { useContext, useState } from "react";
import AuthContext from "@/contexts/auth/context";

type ClientInfoForm = {
  fullName?: string;
  birthdate?: string;
};

export function useUpdateClientInfo() {
  const { clientProfile, updateClientProfile } = useContext(AuthContext);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [newFullName, setNewFullName] = useState(clientProfile?.fullName);
  const [newBirthdate, setNewBirthdate] = useState(clientProfile?.birthdate);

  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors },
  } = useForm<ClientInfoForm>();

  const onSubmit: SubmitHandler<ClientInfoForm> = async (data) => {
    const requestBody = {
      ...data,
    };

    try {
      await shopAndGoAPI.patch(`clients/` + clientProfile?.id, requestBody);

      const notificationInfo: NotificationInfo = {
        title: "Información actualizada",
        message: "La información del cliente ha sido actualizada exitosamente",
        type: NotificationTypes.SUCCESS,
      };

      notify(notificationInfo);
      setEditingField(null);
      setNewFullName(data.fullName);
      setNewBirthdate(data.birthdate);
      updateClientProfile({
        ...clientProfile!,
        fullName: data.fullName!,
        birthdate: data.birthdate!,
      });
    } catch (error) {
      const notificationInfo: NotificationInfo = {
        title: "Servicio no disponible",
        message:
          "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
        type: NotificationTypes.ERROR,
      };

      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status))
      ) {
        notificationInfo.title = "Error al actualizar";
        notificationInfo.message =
          "No se pudo actualizar la información del cliente";
      }

      notify(notificationInfo);
    }
  };

  const handleSubmit = submitWrapper(onSubmit);

  const handleCancel = () => {
    setEditingField(null);
    setNewFullName(clientProfile?.fullName);
    setNewBirthdate(clientProfile?.birthdate);
  };

  return {
    editingField,
    setEditingField,
    newFullName,
    setNewFullName,
    newBirthdate,
    setNewBirthdate,
    errors,
    register,
    handleSubmit,
    handleCancel,
  };
}
