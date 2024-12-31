"use client";

import AuthContext from "@/contexts/auth/context";
import { FC, useState, useContext } from "react";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
};

const ClientInfo: FC = () => {
  const { clientProfile } = useContext(AuthContext);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [newFullName, setNewFullName] = useState(clientProfile?.fullName);
  const [newBirthdate, setNewBirthdate] = useState(clientProfile?.birthdate);

  const handleSave = async () => {
    setEditingField(null);
  };

  const handleCancel = () => {
    setNewFullName(clientProfile?.fullName);
    setNewBirthdate(clientProfile?.birthdate);
    setEditingField(null);
  };

  return (
    <section aria-labelledby="client-info-section">
      <h2 id="client-info-section" className="sr-only">Información del Cliente</h2>
      <form className="space-y-8">
        <fieldset className="flex items-center justify-between">
          <legend className="sr-only">Nombre completo</legend>
          <div className={`form-group ${editingField === "fullName" ? "editing" : ""}`}>
            <label htmlFor="fullName" className="block text-gray-600 font-semibold">
              Nombre completo:
            </label>
            {editingField === "fullName" ? (
              <input
                id="fullName"
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
              />
            ) : (
              <p className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
                {clientProfile?.fullName || "Sin información"}
              </p>
            )}
          </div>
          <div className="min-h-[80px] ml-2 flex items-center space-x-2">
            {editingField === "fullName" ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
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
          <div className={`form-group ${editingField === "birthdate" ? "editing" : ""}`}>
            <label htmlFor="birthdate" className="block text-gray-600 font-semibold">
              Fecha de nacimiento:
            </label>
            {editingField === "birthdate" ? (
              <input
                id="birthdate"
                type="date"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                value={newBirthdate}
                onChange={(e) => setNewBirthdate(e.target.value)}
              />
            ) : (
              <p className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
                {formatDate(clientProfile?.birthdate) || "Sin información"}
              </p>
            )}
          </div>
          <div className="min-h-[80px] ml-2 flex items-center space-x-2">
            {editingField === "birthdate" ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
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
