import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { TernaryButton } from "@/components/buttons/TernaryButton";
import { Modal } from "@/components/ui/Modal";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type CreateIncidentModalProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
  formState: {
    register: UseFormRegister<{ reason: string; }>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<{ reason: string }>;
    isSavingIncidentInfo: boolean;
  };
}

export const CreateIncidentModal: FC<CreateIncidentModalProps> = ({
  isOpen, 
  handleCloseModal,
  formState
}) => {
  return (
    <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <h1>Reporte de incidencia</h1>
      <p className="mt-1">¿Desea reportar un incidente con el pedido?</p>

      <form className="mt-8" onSubmit={formState.handleSubmit}>
        <div className={`form-group ${formState.errors.reason ? "invalid" : ""}`}>
          <label htmlFor="reason">Motivo de la cancelación</label>
          <textarea 
            {
              ...formState.register(
                "reason", 
                { required: true, maxLength: 255 }
              )
            }
            id="reason"
            disabled={formState.isSavingIncidentInfo}
            rows={6}
            placeholder="Explique la razón de por qué cancela el pedido"
          />
          <p className="error">El motivo no puede estar vacío, ni superar los 255 caracteres</p>
        </div>

        <div className="mt-8 mb-3 sm:flex justify-end">
          <TernaryButton 
            onClick={handleCloseModal}
            type="button" 
            className="text-red-600 hover:text-red-700 mb-3 sm:mr-3 sm:mb-0 w-full sm:w-auto"
            disabled={formState.isSavingIncidentInfo}
          >
            Descartar
          </TernaryButton>
          <PrimaryButton className="w-full sm:w-auto" disabled={formState.isSavingIncidentInfo}>Generar reporte</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
