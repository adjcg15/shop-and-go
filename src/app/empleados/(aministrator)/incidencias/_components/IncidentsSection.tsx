"use client";
import { useIncidents } from "../hooks/useIncidents";
import { useEffect } from "react";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { IncidentsTable } from "./IncidentsTable";
import { IncidentsTableControl } from "./IncidentsTableControl";
import { useExportIncidents } from "../hooks/useExportIncidents";

export const IncidentsSecion = () => {
  const {
    incidentsList,
    loadIncidents,
    bottomOfIncidentsTableRef,
    totalIncidentsRef
  } = useIncidents();
  const {
    incidentsToExport,
    toggleIncidentToExport,
    toggleAllIncidentsToExport,
    exportIncidentsToCSV,
    exportingIncidents
  } = useExportIncidents(incidentsList.value);

  useEffect(() => {
    const handleEndOfIncidentsTableReached: IntersectionObserverCallback =
      async (entries) => {
        const [bottomOfincidentsTable] = entries;

        if (
          (bottomOfincidentsTable.isIntersecting || incidentsList.value.length === 0) &&
          !incidentsList.loading &&
          incidentsList.stillIncidentsToLoad
        ) {
          const INCIDENTS_BATCH = 20;
          const totalIncidentsLoaded = incidentsList.value.length;

          await loadIncidents(INCIDENTS_BATCH, totalIncidentsLoaded);
        }
      };

    const incidentsTableObserver = new IntersectionObserver(
      handleEndOfIncidentsTableReached,
      { rootMargin: "0px", threshold: 0.1 }
    );
    const bottomOfIncidentsTable = bottomOfIncidentsTableRef.current;

    if (bottomOfIncidentsTable) {
      incidentsTableObserver.observe(bottomOfIncidentsTable);
    }

    return () => {
      incidentsTableObserver.disconnect();
    };
  }, [
    bottomOfIncidentsTableRef, 
    incidentsList.loading, 
    incidentsList.stillIncidentsToLoad, 
    incidentsList.value.length, 
    loadIncidents
  ]);

  return (
    incidentsList.error ? (
      <ErrorBanner
        image={{
          src: "/illustrations/server-error.svg",
          alt: "Imagen representativa de un servidor no disponible",
        }}
        title={"¡Problemas técnicos!"}
        message={incidentsList.error}
      />
    )
    : (
      <>
        {
          !incidentsList.loading && incidentsList.value.length === 0 && (
            <ErrorBanner
              image={{
                src: "/illustrations/empty-cart.svg",
                alt: "Imagen representativa de un carrito de compras vacío",
              }}
              title={"¡No hay reportes!"}
              message={`Aún no hay reportes de incidencias por mostrar.`}
            />
          )
        }
        {incidentsList.value.length > 0 && (
          <>
            <IncidentsTableControl 
              incidentsLoaded={incidentsList.value.length} 
              totalIncidents={totalIncidentsRef.current}
              incidentsToExport={incidentsToExport}
              exportIncidentsToCSV={exportIncidentsToCSV}
              exportingIncidents={exportingIncidents}
            />
            <IncidentsTable 
              incidents={incidentsList.value} 
              loadingMoreIncidents={incidentsList.loading}
              toggleIncidentToExport={toggleIncidentToExport}
              toggleAllIncidentsToExport={toggleAllIncidentsToExport}
              incidentsToExport={incidentsToExport}
              exportingIncidents={exportingIncidents}
            />
          </>
        )}
        <div ref={bottomOfIncidentsTableRef} className="h-0"></div>
      </>
    )
  );
}
