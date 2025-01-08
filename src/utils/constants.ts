import { ProductCategory } from "@/types/types/model/products";

const GUEST_ROUTES: (string | RegExp)[] = [
    "/",
    "/iniciar-sesion",
    "/crear-cuenta",
    "/recuperar-contrasenia",
    "/catalogo",
    new RegExp("^/productos/[^/]+$"),
    "/carrito",
];

const CLIENT_ROUTES: (string | RegExp)[] = [
    "/",
    "/metodos-pago",
    "/metodos-pago/nuevo",
    "/clientes/pedidos",
    "/confirmar-pedido",
    "/catalogo",
    new RegExp("^/productos/[^/]+$"),
    "/carrito",
    "/direcciones-entrega",
    "/direcciones-entrega/nueva",
    "/mi-perfil",
];

const ADMIN_ROUTES: (string | RegExp)[] = [
    "/empleados/productos",
    new RegExp("^/empleados/productos/[^/]+$"),
    "/empleados/productos/nuevo",
    "/empleados/sucursales",
    "/empleados/sucursales/nueva",
    "/empleados/categorias",
    "/empleados/personal",
    "/empleados/personal/nuevo",
    "/empleados/incidencias",
];

const SALES_EXECUTIVE_ROUTES: (string | RegExp)[] = [
    "/empleados/pedidos",
    new RegExp("^\/empleados\/pedidos\/[^\/]+$"),
    "/empleados/productos-en-tienda",
    new RegExp("^/empleados/productos-en-tienda/[^/]+$"),
    "/empleados/productos-en-tienda/nuevo",
];

const DELIVERY_MAN_ROUTES: string[] = ["/empleados/pedidos-asignados"];

const NEAREST_STORE_CHECK_ROUTES: (string | RegExp)[] = [
    "/catalogo",
    new RegExp("^/productos/[^/]+$"),
];

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
