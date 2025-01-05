import { ProductCategory } from "@/types/types/model/products";

const GUEST_ROUTES: string[] = [
    "/",
    "/iniciar-sesion",
    "/crear-cuenta",
    "/recuperar-contrasenia",
    "/catalogo",
    "/productos/[barCode]",
    "/carrito",
];

const CLIENT_ROUTES: string[] = [
    "/",
    "/metodos-pago",
    "/metodos-pago/nuevo",
    "/clientes/pedidos",
    "/catalogo",
    "/productos/[barCode]",
    "/carrito",
    "/direcciones-entrega",
    "/mi-perfil",
];

const ADMIN_ROUTES: string[] = [
    "/empleados/productos",
    "/empleados/productos/[barCode]",
    "/empleados/productos/nuevo",
    "/empleados/sucursales",
    "/empleados/sucursales/nueva",
    "/empleados/categorias",
    "/empleados/personal",
    "/empleados/incidencias",
];

const SALES_EXECUTIVE_ROUTES: string[] = [
    "/empleados/pedidos",
    "/empleados/productos-en-tienda",
];

const DELIVERY_MAN_ROUTES: string[] = ["/empleados/pedidos-asignados"];

const NEAREST_STORE_CHECK_ROUTES: string[] = ["/catalogo"];

const DEFAULT_PRODUCT_CATEGORY: ProductCategory = {
    id: 0,
    name: "Todos los productos",
};

export {
    GUEST_ROUTES,
    CLIENT_ROUTES,
    ADMIN_ROUTES,
    SALES_EXECUTIVE_ROUTES,
    DELIVERY_MAN_ROUTES,
    DEFAULT_PRODUCT_CATEGORY,
    NEAREST_STORE_CHECK_ROUTES,
};
