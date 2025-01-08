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
            <label
              htmlFor="fullName"
            >
              Nombre completo:
            </label>
            {editingField === "fullName" ? (
              <input
                id="fullName"
                type="text"
                defaultValue={newFullName}
                {...register("fullName", {
                  required: true,
                  maxLength: 200,
                  pattern: FULL_NAME_PATTERN,
                })}
              />
            ) : (
              <p className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
                {newFullName || "Sin información"}
              </p>
            )}
            {errors.fullName && editingField === "fullName" && (
              <p className="error">
              Nombre completo inválido. Se deben incluir al menos nombre y apellido.
              </p>
            )}
          </div>
          <div className="min-h-[80px] ml-2 flex items-center space-x-2">
            {editingField === "fullName" ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-green-500 hover:text-green-600"
                >
                  <FiCheck size={24} />
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiX size={24} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditingField("fullName")}
                className="text-gray-800 hover:text-blue-600"
              >
                <FiEdit2 size={20} />
              </button>
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
            <label
              htmlFor="birthdate"
            >
              Fecha de nacimiento:
            </label>
            {editingField === "birthdate" ? (
              <input
                id="birthdate"
                type="date"
                defaultValue={newBirthdate || ""}
                {...register("birthdate", {
                  required: true,
                  validate: (value) => validateBirthdate(value ?? ""),
                })}
              />
            ) : (
              <p className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
                {formatDate(newBirthdate) || "Sin información"}
              </p>
            )}
            {errors.birthdate && editingField==="birthdate" && (
              <p className="error">{errors.birthdate.message}</p>
            )}
          </div>
          <div className="min-h-[80px] ml-2 flex items-center space-x-2">
            {editingField === "birthdate" ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-green-500 hover:text-green-600"
                >
                  <FiCheck size={24} />
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiX size={24} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditingField("birthdate")}
                className="text-gray-800 hover:text-blue-600"
              >
                <FiEdit2 size={20} />
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ClientInfo;
