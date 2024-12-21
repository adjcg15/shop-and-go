import UserRoles from "@/types/enums/user_roles";

function getDefaultPageForRole(userRole: UserRoles): string {
  const DEFAULT_ROUTES_MAP = {
    [UserRoles.ADMINISTRATOR]: "/empleados/productos",
    [UserRoles.CLIENT]: "/",
    [UserRoles.SALES_EXECUTIVE]: "/empleados/pedidos",
    [UserRoles.DELIVERY_MAN]: "/empleados/pedidos-asignados",
    [UserRoles.GUEST]: "/"
  }

  return DEFAULT_ROUTES_MAP[userRole];
}

export {
  getDefaultPageForRole
};