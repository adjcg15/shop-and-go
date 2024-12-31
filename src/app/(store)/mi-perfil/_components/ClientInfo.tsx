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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="min-h-[80px] w-full">
          <label
            htmlFor="fullName"
            className="block text-gray-600 font-semibold"
          >
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
            <div className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
              {clientProfile?.fullName || "Sin información"}
            </div>
          )}
        </div>
        <div className="min-h-[80px] ml-2 flex items-center space-x-2">
          {editingField === "fullName" ? (
            <>
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-600"
              >
                <FiCheck size={24} />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-600"
              >
                <FiX size={24} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditingField("fullName")}
              className="text-gray-800 hover:text-blue-600"
            >
              <FiEdit2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="min-h-[80px] w-full">
          <label className="block text-gray-600 font-semibold">
            Fecha de nacimiento:
          </label>
          {editingField === "birthdate" ? (
            <input
              type="date"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              value={newBirthdate}
              onChange={(e) => setNewBirthdate(e.target.value)}
            />
          ) : (
            <div className="w-full mt-2 p-2 text-gray-800 border border-transparent rounded-md">
              {formatDate(clientProfile?.birthdate) || "Sin información"}
            </div>
          )}
        </div>
        <div className="ml-2 flex items-center space-x-2">
          {editingField === "birthdate" ? (
            <>
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-600"
              >
                <FiCheck size={24} />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-600"
              >
                <FiX size={24} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditingField("birthdate")}
              className="text-gray-800 hover:text-blue-600"
            >
              <FiEdit2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
