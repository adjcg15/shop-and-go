import { IncidentsListResponse } from "@/types/types/api/orders";
import { Incident } from "@/types/types/model/orders";
import shopAndGoAPI from "@/utils/axios";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useRef, useState } from "react";

type IncidentsListState = {
    loading: boolean;
    value: Incident[];
    error: null | string;
    stillIncidentsToLoad: boolean;
};

const INITIAL_INCIDENTS_LIST_STATE = {
    loading: false,
    value: [],
    totalIncidents: 0,
    error: null,
    stillIncidentsToLoad: true,
};

export function useIncidents() {
    const [incidentsList, setIncidentsList] = useState<IncidentsListState>(INITIAL_INCIDENTS_LIST_STATE);
    const totalIncidentsRef = useRef(0);
    const bottomOfIncidentsTableRef = useRef(null);

    const startIncidentsLoading = useCallback(() => {
        setIncidentsList((previousIncidentsList) => ({
            loading: true,
            value: previousIncidentsList.value,
            error: null,
            stillIncidentsToLoad: true,
        }));
    }, []);

    const finishIncidentsLoading = useCallback(
        (
            incidents: Incident[],
            totalIncidents: number,
            stillIncidentsToLoad: boolean = false
        ) => {
            totalIncidentsRef.current = totalIncidents;

            setIncidentsList((previousIncidentsList) => ({
                loading: false,
                value: [...previousIncidentsList.value, ...incidents],
                error: null,
                stillIncidentsToLoad,
            }));
        },
        []
    );

    const fireErrorLoadingIncidents = useCallback((message?: string) => {
        setIncidentsList((previousIncidentsList) => ({
            loading: false,
            value: previousIncidentsList.value,
            error:
                message ??
                "Estamos teniendo problemas para cargar los reportes de incidencias, por favor intente más tarde.",
            stillIncidentsToLoad: false,
        }));
    }, []);

    const loadIncidents = useCallback(
        async (incidentsBatchSize: number, totalIncidentsToOmit: number) => {
            startIncidentsLoading();
            try {
                const params = { limit: incidentsBatchSize }  as { limit: number; offset?: number; };
                if (totalIncidentsToOmit > 0) params.offset = totalIncidentsToOmit;

                const { data: incidentsSummary } =
                    await shopAndGoAPI.get<IncidentsListResponse>(`/incidents`,{ params });
                const stillProductsToLoad = incidentsSummary.incidents.length === incidentsBatchSize;
                finishIncidentsLoading(incidentsSummary.incidents, incidentsSummary.count, stillProductsToLoad);
            } catch (error) {
                let message;

                if (
                    isAxiosError(error) &&
                    error.code === AxiosError.ERR_NETWORK
                ) {
                    message =
                        "No fue posible establecer una conexión para cargar " +
                        "la lista de incidentes. Verifique que su conexión a Internet es estable o intente más tarde.";
                }

                fireErrorLoadingIncidents(message);
            }
        },
        [
            startIncidentsLoading,
            finishIncidentsLoading,
            fireErrorLoadingIncidents
        ]
    );

    return {
        incidentsList,
        totalIncidentsRef,
        bottomOfIncidentsTableRef,
        loadIncidents
    };
}