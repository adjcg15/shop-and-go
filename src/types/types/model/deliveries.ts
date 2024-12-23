type Address = {
  id: number;
  street: string;
  streetNumber: string;
  apartmentNumber: string | null;
  neighborhood: string;
  municipality: string;
  city: string;
  postalCode: string;
  state: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
};

export type {
  Address
};