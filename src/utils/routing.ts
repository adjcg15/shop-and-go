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

function isRouteInRoutesArray(pathName: string, routesArray: (string | RegExp)[]) {
  return routesArray.some(route => {
    let isMatch = false;

    if(typeof route === "string") {
      isMatch = route === pathName;
    } else if(route instanceof RegExp) {
      isMatch = route.test(pathName);
    } 

    return isMatch;
  })
}

export {
  getDefaultPageForRole,
  isRouteInRoutesArray
};