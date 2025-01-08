"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useAssignOrder } from "../_hooks/useAssignOrder";
import { useDeliveryMenAvailable } from "../_hooks/useDeliveryMenAvailable";
import { FC, useEffect, useMemo } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type AssignOrderSectionProps = {
  idOrder: number;
};

export const AssignOrderSection: FC<AssignOrderSectionProps> = ({ idOrder }) => {
  const { 
    orderAssignationForm, 
    isConfirmatingAssignation, 
    discardDeliveryManAssignation,
    assignDeliveryManToOrder
  } = useAssignOrder(idOrder);
  const { deliveryMenList, recoverDeliveryMenList } = useDeliveryMenAvailable();

  const confirmationModalMessage = useMemo(() => {
    let message = "¿Está seguro de asignar el pedido?";
    const idDeliveryMan = Number(orderAssignationForm.getValues("idDeliveryMan"));
    
    message += 
      isNaN(idDeliveryMan) || idDeliveryMan === 0
      ? ""
      : " a " + deliveryMenList.value.find(employee => employee.id === idDeliveryMan)?.fullName;
    
    return message;
  }, [deliveryMenList.value, orderAssignationForm]);

  useEffect(() => {
    recoverDeliveryMenList();
  }, [recoverDeliveryMenList]);
  
  return (
    <>
      <section className="mt-8">
        <h2>Envío del pedido</h2>
        <form onSubmit={orderAssignationForm.handleSubmit}>
          <div className={`form-group ${orderAssignationForm.errors.idDeliveryMan ? "invalid" : ""}`}>
            <label htmlFor="idDeliveryMan">Repartidor</label>
            <select 
              {
                ...orderAssignationForm.register(
                  "idDeliveryMan", 
                  { validate: (value) => Number(value) !== 0 }
                )
              }
              id="idDeliveryMan"
              disabled={orderAssignationForm.isProcessingAssignation || deliveryMenList.error !== null}
              aria-describedby="deliveryManInputDescription"
            >
              <option value={0} disabled>
                {
                  deliveryMenList.error
                  ? "Lista de repartidores no disponible"
                  : "Seleccione un repartidor"
                }
              </option>
              {
                deliveryMenList.value.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.fullName}</option>
                ))
              }
            </select>
            <p className="sr-only" id="deliveryManInputDescription">Nombre del repartidor que entregará el pedido</p>
            <p className="error">Debe seleccionar un repartidor</p>
          </div>

          <div className="mt-5 flex justify-end">
            <PrimaryButton 
              disabled={orderAssignationForm.isProcessingAssignation || deliveryMenList.error !== null || idOrder === 0}
              aria-describedby="assignOrderButtonDescription"
            >
              Enviar pedido
            </PrimaryButton>
            <p className="sr-only" id="assignOrderButtonDescription">Mostrar ventana de confirmación de asignación de pedido</p>
          </div>
        </form>
      </section>
      <ConfirmationModal
        isOpen={isConfirmatingAssignation}
        onClose={() => {
          if(!orderAssignationForm.isProcessingAssignation)
            discardDeliveryManAssignation()
        }}
        onConfirm={assignDeliveryManToOrder}
        title="Asignar pedido"
        message={confirmationModalMessage}
        primaryButtonText="Asignar"
        secondaryButtonText="Descartar"
      />
    </>
  );
}