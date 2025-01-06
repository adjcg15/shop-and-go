import { Incident } from "../model/orders";

type IncidentsListResponse = {
    incidents: Incident[];
    count: number;
};

export type {
    IncidentsListResponse
};