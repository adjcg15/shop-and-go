import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function useAssignOrder() {
  const [isProcessingAssignation, setIsProcessingAssignation] = useState(false);
  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors }
  } = useForm({
    defaultValues: { idDeliveryMan: 0 }
  });

  const onSubmit: SubmitHandler<{ idDeliveryMan: number }> = async ({ idDeliveryMan }) => {
    console.log(idDeliveryMan);
    setIsProcessingAssignation(true);

    // try {
    //   const { data: incidentCreated } = await shopAndGoAPI.post<Incident>("/incidents", { reason, idOrder });
    //   notify({
    //     title: "Pedido cancelado",
    //     message: "El reporte de incidencia fue generado exitosamente",
    //     type: NotificationTypes.SUCCESS
    //   });
    //   onOrderCanceled(incidentCreated.idOrder);
    //   setIsCreatingIncident(false);
    // } catch(error) {
    //   const notificationInfo: NotificationInfo = {
    //     title: "Error al guardar",
    //     message: "El sistema no logró guardar el reporte de incidencia, por favor intente en otro momento.",
    //     type: NotificationTypes.ERROR,
    //   };

    //   if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
    //     notificationInfo.message =
    //       "No fue posible establecer una conexión para guardar " +
    //       "el reporte de incidencia. Verifique que su conexión a Internet es estable o intente más tarde.";
    //   }

    //   notify(notificationInfo);
    // } finally {
    //   setIsSavingIncidentInfo(false);
    // }
  };
  const handleSubmit = submitWrapper(onSubmit);

  return {
    orderAssignationForm: {
      register,
      handleSubmit,
      errors,
      isProcessingAssignation
    }
  }
}