"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useAssignOrder } from "../_hooks/useAssignOrder";
import { useDeliveryMenAvailable } from "../_hooks/useDeliveryMenAvailable";
import { useEffect } from "react";

export const AssignOrderSection = () => {
  const { orderAssignationForm } = useAssignOrder();
  const { deliveryMenList, recoverDeliveryMenList } = useDeliveryMenAvailable();

  useEffect(() => {
    recoverDeliveryMenList();
  }, [recoverDeliveryMenList]);
  
  return (
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
          <p className="error">Debe seleccionar un repartidor</p>
        </div>

        <div className="mt-5 flex justify-end">
          <PrimaryButton 
            disabled={orderAssignationForm.isProcessingAssignation || deliveryMenList.error !== null}
          >
            Enviar pedido
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}