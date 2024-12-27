"use client";
import { useCallback, useState } from "react";
import { usePaymentMethods } from "../_hooks/usePaymentMethods";
import { PaymentMethods } from "./PaymentMethod";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { PaymentMethod } from "@/types/types/model/payment_methods";

export const ListWrapper = () => {
  const { paymentMethods, loading, deletePaymentMethod } = usePaymentMethods();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(
    null
  );

  const handleDelete = useCallback((paymentMethod: PaymentMethod) => {
    setMethodToDelete(paymentMethod);
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (methodToDelete !== null) {
      deletePaymentMethod(methodToDelete.id);
      setIsModalOpen(false);
      setMethodToDelete(null);
    }
  }, [deletePaymentMethod, methodToDelete]);

  const cancelDelete = useCallback(() => {
    setIsModalOpen(false);
    setMethodToDelete(null);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center mt-36 text-2xl gap-8">
          Cargando métodos de pago...
        </p>
      </div>
    );

  if (!paymentMethods || paymentMethods.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center mt-36 text-2xl gap-8">
          No existen métodos de pago registrados, <br />
          deberá registrar uno nuevo
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="mt-9 grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 bg-gray-300 p-4 border border-slate-500 text-xs sm:text-sm md:text-xs lg:text-lg">
        <li className="flex justify-center items-center">
          <p className="font-semibold text-gray-800 text-center">Banco</p>
        </li>
        <li className="flex justify-center items-center">
          <p className="font-semibold text-gray-800 text-center">Tarjeta</p>
        </li>
        <li className="flex justify-center items-center">
          <p className="font-semibold text-gray-800 text-center">Titular</p>
        </li>
        <li className="flex justify-center items-center">
          <p className="font-semibold text-gray-800 text-center">Eliminar</p>
        </li>
      </ul>

      <PaymentMethods paymentMethods={paymentMethods} onDelete={handleDelete} />
      <ConfirmationModal
        title="Eliminación del método de pago"
        message={
          methodToDelete
            ? `¿Está seguro que desea eliminar el método de pago:\n${methodToDelete.bankIssuer},\nXXXX XXXX XXXX ${methodToDelete.endCardNumber},\nTitular: ${methodToDelete.cardholderName}?`
            : ""
        }
        primaryButtonText="Eliminar"
        secondaryButtonText="Cancelar"
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
};
