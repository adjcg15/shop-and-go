type Store = {
    id: number;
    name: string;
    address: string;
    openingTime: string;
    closingTime: string;
    latitude: number;
    longitude: number;
};

type Inventory = {
    id: number;
    stock: number;
    expirationDate: string;
    idStore: number;
    idProduct: number;
};

export type { Store, Inventory };
