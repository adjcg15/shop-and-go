import { Address } from "./deliveries";
import { Client } from "./users";

type Incident = {
    id: number;
    creationDate: string;
    reason: string;
    idOrder: number;
};

type Order = {
    id: number;
    dateOfPurchase: string;
    deliveryDate: string | null;
    idStatus: number;
    idDeliveryAddress: number;
    idClient: number;
    idPaymentMethod: number;
    idStore: number;
    idDeliveryMan: number;
    deliveryAddress?: Address;
    client?: Client;
};

export type {
    Incident,
    Order
};