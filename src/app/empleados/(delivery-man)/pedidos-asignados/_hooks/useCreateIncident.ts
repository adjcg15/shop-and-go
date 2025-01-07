import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { Incident } from "@/types/types/model/orders";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function useCreateIncident(onOrderCanceled: (idOrder: number) => void) {
  const [isCreatingIncident, setIsCreatingIncident] = useState(false);
  const [isSavingIncidentInfo, setIsSavingIncidentInfo] = useState(false);
  const [idOrder, setIdOrder] = useState(0);
  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: { reason: "" }
  });

  const startIncidentCreation = useCallback((idOrder: number) => {
    setIdOrder(idOrder);
    setIsCreatingIncident(true);
  }, []);

  const discardIncidentCreation = useCallback(() => {
    setIsCreatingIncident(false);
    reset();
  }, [reset]);

  const onSubmit: SubmitHandler<{ reason: string }> = async ({ reason }) => {
    setIsSavingIncidentInfo(true);

    try {
      const { data: incidentCreated } = await shopAndGoAPI.post<Incident>("/incidents", { reason, idOrder });
      notify({
        title: "Pedido cancelado",
        message: "El reporte de incidencia fue generado exitosamente",
        type: NotificationTypes.SUCCESS
      });
      onOrderCanceled(incidentCreated.idOrder);
      setIsCreatingIncident(false);
    } catch(error) {
      const notificationInfo: NotificationInfo = {
        title: "Error al guardar",
        message: "El sistema no logró guardar el reporte de incidencia, por favor intente en otro momento.",
        type: NotificationTypes.ERROR,
      };

      if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        notificationInfo.message =
          "No fue posible establecer una conexión para guardar " +
          "el reporte de incidencia. Verifique que su conexión a Internet es estable o intente más tarde.";
      }

      notify(notificationInfo);
    } finally {
      setIsSavingIncidentInfo(false);
    }
  };
  const handleSubmit = submitWrapper(onSubmit);

  return {
    isCreatingIncident,
    discardIncidentCreation,
    startIncidentCreation,
    incidentForm: {
      register,
      handleSubmit,
      errors,
      isSavingIncidentInfo
    }
  }
}