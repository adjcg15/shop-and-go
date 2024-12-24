import { ProductCategory } from "@/types/types/model/products";

const GUEST_ROUTES: string[] = [
  "/",
  "/iniciar-sesion",
  "/crear-cuenta",
  "/recuperar-contrasenia",
  "/catalogo",
  "/carrito"
];

const CLIENT_ROUTES: string[] = [
  "/",
  "/clientes/pedidos",
  "/catalogo",
  "/carrito"
];

const ADMIN_ROUTES: string[] = [
  "/empleados/productos",
  "/empleados/sucursales",
  "/empleados/categorias",
  "/empleados/personal",
  "/empleados/incidencias"
];

const SALES_EXECUTIVE_ROUTES: string[] = [
  "/empleados/pedidos"
];

const DELIVERY_MAN_ROUTES: string[] = [
  "/empleados/pedidos-asignados"
];

const DEFAULT_PRODUCT_CATEGORY: ProductCategory = {
  id: 0,
  name: "Todos los productos"
};

export {
  GUEST_ROUTES,
  CLIENT_ROUTES,
  ADMIN_ROUTES,
  SALES_EXECUTIVE_ROUTES,
  DELIVERY_MAN_ROUTES,
  DEFAULT_PRODUCT_CATEGORY
}