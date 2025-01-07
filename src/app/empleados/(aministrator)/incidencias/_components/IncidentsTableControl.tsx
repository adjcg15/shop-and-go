import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { FC } from "react";

type IncidentsTableControlProps = {
  incidentsLoaded: number;
  totalIncidents: number;
  incidentsToExport: number[];
  exportIncidentsToCSV: () => void;
  exportingIncidents: boolean;
};

export const IncidentsTableControl: FC<IncidentsTableControlProps> = ({
  incidentsLoaded, 
  totalIncidents,
  incidentsToExport,
  exportIncidentsToCSV,
  exportingIncidents
}) => {
  return (
    <section className="mt-5 md:flex md:justify-between lg:items-center mb-3">
      <div className="mb-3 lg:flex lg:mb-0 lg:items-center">
        <PrimaryButton
          onClick={exportIncidentsToCSV}
          disabled={exportingIncidents || incidentsToExport.length === 0}
        >
          Exportar incidencias
        </PrimaryButton>
        <p className="mt-1 lg:mt-0  lg:ml-3">
          {
            incidentsToExport.length === incidentsLoaded
            ? "Todas las"
            : `${incidentsToExport.length} de ${incidentsLoaded}`
          } incidencias seleccionadas
          </p>
      </div>

      <p className="font-semibold text-orange-500">Mostrando {incidentsLoaded} de {totalIncidents} incidencias</p>
    </section>
  )
}
