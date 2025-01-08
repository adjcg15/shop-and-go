import { Incident } from "@/types/types/model/orders";
import { formatDDMMYYY } from "@/utils/date";
import { FC } from "react";

type IncidentsTableProps = {
  incidents: Incident[];
  loadingMoreIncidents: boolean;
  toggleIncidentToExport: (idIncident: number) => void;
  toggleAllIncidentsToExport: () => void;
  incidentsToExport: number[];
  exportingIncidents: boolean;
}

export const IncidentsTable: FC<IncidentsTableProps> = ({ 
  incidents, 
  loadingMoreIncidents,
  incidentsToExport,
  toggleIncidentToExport,
  toggleAllIncidentsToExport,
  exportingIncidents
}) => {
  return (
    <>
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full min-w-[500px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="uppercase">
                <label htmlFor="checkbox-global" className="px-1 md:px-5 cursor-pointer peer-disabled:cursor-default">
                  <input 
                    id="checkbox-global"
                    type="checkbox"
                    checked={incidents.length === incidentsToExport.length}
                    onChange={toggleAllIncidentsToExport}
                    disabled={exportingIncidents}
                    className="peer"
                    aria-describedby="selectAllIncidentsInputDescription"
                  />
                  <p className="sr-only" id="selectAllIncidentsInputDescription">
                    {incidents.length === incidentsToExport.length ? "Quitar la selección de " : "Seleccionar " } 
                    todas las incidencias en la tabla
                  </p>
              </label>
              </th>
              <th className="uppercase py-3 px-1 md:px-5">Creación</th>
              <th className="uppercase py-3 px-1 md:px-5">Motivo</th>
              <th className="uppercase py-3 px-1 md:px-5">Pedido</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id} className="text-center border-b border-gray-300">
                <td>
                  <label htmlFor={`checkbox-local-${incident.id}`} className="py-3 px-1 md:px-5 cursor-pointer peer-disabled:cursor-default">
                    <input 
                      id={`checkbox-local-${incident.id}`}
                      type="checkbox"
                      checked={incidentsToExport.includes(incident.id)}
                      onChange={() => toggleIncidentToExport(incident.id)}
                      disabled={exportingIncidents}
                      className="peer"
                      aria-describedby={`markIncidentInputDescription${incident.id}`}
                    />
                    <p className="sr-only" id={`markIncidentInputDescription${incident.id}`}>
                      {incidentsToExport.includes(incident.id) ? "Quitar la selección de " : "Seleccionar " } 
                      la incidencia
                    </p>
                  </label>
                </td>
                <td className="py-3 px-1 md:px-5">{ formatDDMMYYY(new Date(incident.creationDate)) }</td>
                <td className="py-3 px-1 md:px-5">{ incident.reason }</td>
                <td className="py-3 px-1 md:px-5">{ incident.idOrder }</td>
              </tr>
            ))}
            {loadingMoreIncidents && (
              Array.from({ length: 20 }, (_, index) => (
                <tr className="animate-pulse border-b border-gray-300" key={`loading-skeleton-${index}`}>
                  <td className="py-3 px-5"></td>
                  <td className="py-3 px-5"><div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div></td>
                  <td className="py-3 px-5"><div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div></td>
                  <td className="py-3 px-5"><div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
