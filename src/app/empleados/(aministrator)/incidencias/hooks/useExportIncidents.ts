"use client";
import { Incident } from "@/types/types/model/orders";
import { useCallback, useState } from "react";

export function useExportIncidents(incidentsList: Incident[]) {
    const [incidentsToExport, setIncidentToExport] = useState<number[]>([]);
    const [exportingIncidents, setExportingIncidents] = useState(false);

    const toggleAllIncidentsToExport = useCallback(() => {
        setIncidentToExport(previousIds => {
            if(previousIds.length === incidentsList.length) {
                return [];
            } else {
                return incidentsList.map(incident => incident.id);
            }
        });
    }, [incidentsList]);

    const toggleIncidentToExport = useCallback((idIncident: number) => {
        setIncidentToExport(previousIds => {
            if(previousIds.includes(idIncident)) {
                return previousIds.filter((id) => id !== idIncident);
            } else {
                return [...previousIds, idIncident];
            }
        });
    }, []);

    const exportIncidentsToCSV = useCallback(() => {
        setExportingIncidents(true);
        
    }, [incidentsToExport]);

    return {
        exportingIncidents,
        incidentsToExport,
        toggleIncidentToExport,
        toggleAllIncidentsToExport,
        exportIncidentsToCSV
    };
}