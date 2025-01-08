"use client";

import { useUpdateClientInfo } from "../_hooks/useUpdateClientInfo";
import { FULL_NAME_PATTERN } from "@/utils/regexp";
import { FC } from "react";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { formatDate, validateBirthdate } from "@/utils/date";

const ClientInfo: FC = () => {
  const {
    editingField,
    setEditingField,
    newFullName,
    newBirthdate,
    errors,
    register,
    handleSubmit,
    handleCancel,
  } = useUpdateClientInfo();

  return (
    <section aria-labelledby="client-info-section">
      <h2 id="client-info-section" className="sr-only">
        Información del Cliente
      </h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <fieldset className="flex items-center justify-between">
          <legend className="sr-only">Nombre completo</legend>
          <div
            className={`w-full form-group ${
              editingField === "fullName" ? "editing" : ""
            } ${errors.fullName ? "invalid" : ""}`}
          >
            <label htmlFor="fullName">
              Nombre completo:
              <abbr className="text-orange-600 no-underline" title="Requerido">
                *
              </abbr>
            </label>
            {editingField === "fullName" ? (
              <>
                <input
                  id="fullName"
                  type="text"
                  aria-labelledby="fullNameInput"
                  defaultValue={newFullName}
                  {...register("fullName", {
                    required: true,
                    maxLength: 200,
                    pattern: FULL_NAME_PATTERN,
                  })}
                />
                <p id="fullNameInput" className="sr-only">
                  Nuevo nombre completo del cliente
                </p>
              </>
            ) : (
              <p className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
                {newFullName || "Sin información"}
              </p>
            )}
            {errors.fullName && editingField === "fullName" && (
              <p className="error">
                Nombre completo inválido. Se deben incluir al menos nombre y
                apellido.
              </p>
            )}
          </div>
          <div className="min-h-[80px] ml-2 flex items-center space-x-2">
            {editingField === "fullName" ? (
              <>
                <button
                  type="button"
                  aria-labelledby="saveFullNameButton"
                  onClick={handleSubmit}
                  className="text-green-500 hover:text-green-600"
                >
                  <FiCheck size={24} />
                </button>
                <p id="saveFullNameButton" className="sr-only">
                  Guardar cambios en el nombre completo y desactivar edición de
                  nombre completo
                </p>
                <button
                  type="button"
                  onClick={handleCancel}
                  aria-labelledby="cancelFullNameButton"
                  className="text-red-500 hover:text-red-600"
                >
                  <FiX size={24} />
                </button>
                <p id="cancelFullNameButton" className="sr-only">
                  Cancelar edición del nombre completo y desactivar edición de
                  nombre completo
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  aria-labelledby="editFullNameButton"
                  onClick={() => setEditingField("fullName")}
                  className="text-gray-800 hover:text-blue-600"
                >
                  <FiEdit2 size={20} />
                </button>
                <p id="editFullNameButton" className="sr-only">
                  Activar edición del campo de nombre completo
                </p>
              </>
            )}
          </div>
        </fieldset>

        <fieldset className="flex items-center justify-between">
          <legend className="sr-only">Fecha de nacimiento</legend>
          <div
            className={`form-group ${
              editingField === "birthdate" ? "editing" : ""
            } ${errors.birthdate ? "invalid" : ""}`}
          >
            <label htmlFor="birthdate">
              Fecha de nacimiento:
              <abbr className="text-orange-600 no-underline" title="Requerido">
                *
              </abbr>
            </label>
            {editingField === "birthdate" ? (
              <>
                <input
                  id="birthdate"
                  aria-labelledby="birthdateInput"
                  type="date"
                  defaultValue={newBirthdate || ""}
                  {...register("birthdate", {
                    required: true,
                    validate: (value) => validateBirthdate(value ?? ""),
                  })}
                />
                <p id="birthdateInput" className="sr-only">
                  Nueva fecha de nacimiento del cliente
                </p>
              </>
            ) : (
              <p className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
                {formatDate(newBirthdate) || "Sin información"}
              </p>
            )}
            {errors.birthdate && editingField === "birthdate" && (
              <p className="error">{errors.birthdate.message}</p>
            )}
          </div>
          <div className="min-h-[80px] ml-2 flex items-center space-x-2">
            {editingField === "birthdate" ? (
              <>
                <button
                  type="button"
                  aria-labelledby="saveBirthdateButton"
                  onClick={handleSubmit}
                  className="text-green-500 hover:text-green-600"
                >
                  <FiCheck size={24} />
                </button>
                <p id="saveBirthdateButton" className="sr-only">
                  Guardar cambios en la fecha de nacimiento y desactivar edición
                  de fecha de nacimiento
                </p>
                <button
                  type="button"
                  aria-labelledby="cancelBirthdateButton"
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiX size={24} />
                </button>
                <p id="cancelBirthdateButton" className="sr-only">
                  Cancelar edición de la fecha de nacimiento y desactivar
                  edición de fecha de nacimiento
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  aria-labelledby="editBirthdateButton"
                  onClick={() => setEditingField("birthdate")}
                  className="text-gray-800 hover:text-blue-600"
                >
                  <FiEdit2 size={20} />
                </button>
                <p id="editBirthdateButton" className="sr-only">
                  Activar edición del campo de fecha de nacimiento
                </p>
              </>
            )}
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ClientInfo;
