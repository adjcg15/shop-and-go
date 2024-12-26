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
};

export type {
  Store,
  Inventory
};