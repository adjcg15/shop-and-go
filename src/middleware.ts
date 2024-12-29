import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_ROUTES, GUEST_ROUTES, CLIENT_ROUTES, DELIVERY_MAN_ROUTES, SALES_EXECUTIVE_ROUTES } from "./utils/constants";
import { CustomPayload } from "./types/types/api/jwt";
import UserRoles from "./types/enums/user_roles";
import { getDefaultPageForRole } from "./utils/routing";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";
  const requestedPage = request.nextUrl.pathname;
  let jwtPayload: CustomPayload | null = null;
  
  try {
    const secretKeyBuffer = new TextEncoder().encode(process.env.JWT_SECRET)
    const jwt = await jwtVerify(token, secretKeyBuffer);
    jwtPayload = jwt.payload as CustomPayload;
  } catch {}

  const ROUTE_ROLE_MAP = {
    [UserRoles.ADMINISTRATOR]: ADMIN_ROUTES,
    [UserRoles.CLIENT]: CLIENT_ROUTES,
    [UserRoles.SALES_EXECUTIVE]: SALES_EXECUTIVE_ROUTES,
    [UserRoles.DELIVERY_MAN]: DELIVERY_MAN_ROUTES,
    [UserRoles.GUEST]: GUEST_ROUTES
  };
  
  const userRole = jwtPayload?.userRole || UserRoles.GUEST;
  const allowedRoutes = ROUTE_ROLE_MAP[userRole] || [];
  const isAllowedRoute = allowedRoutes.includes(requestedPage);
  if(!isAllowedRoute) {
    if (userRole === UserRoles.GUEST) {
      const login = new URL(`/iniciar-sesion?p=${requestedPage}`, request.url);
      return NextResponse.redirect(login);
    }

    return NextResponse.redirect(new URL(getDefaultPageForRole(userRole), request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Shared routes (client and guest)
    "/",
    "/catalogo",
    "/carrito",
    // Guest routes
    "/iniciar-sesion",
    "/crear-cuenta",
    "/recuperar-contrasenia",
    "/direcciones-entrega",
    //Client routes
    "/clientes/pedidos",
    "/metodos-pago",
    "/metodos-pago/nuevo",
    // Admin routes
    "/empleados/productos",
    "/empleados/sucursales",
    "/empleados/categorias",
    "/empleados/personal",
    "/empleados/incidencias",
    // Delivery man routes
    "/empleados/pedidos-asignados",
    // Sales executive routes
    "/empleados/pedidos"
  ]
};