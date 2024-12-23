type Product = {
  id: number;
  barCode: string;
  name: string;
  description: string;
  imageUrl: string;
  salePrice: number;
  maximumAmount: number;
  isActive: boolean;
};

type CartItem = {
  product: Product;
  totalProducts: number;
};

export type {
  Product,
  CartItem
};