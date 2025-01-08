import { Address } from "./deliveries";
import { Product } from "./products";
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
    products?: Product[];
};

type OrderProduct = {
    id: number;
    amount: number;
    idProduct: number;
    idOrder: number;
};

export type {
    Incident,
    Order,
    OrderProduct
};