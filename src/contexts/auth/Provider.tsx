"use client";
import { FC, ReactNode, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import Cookies from "js-cookie";
import AuthContext from "./context";
import UserRoles from "@/types/enums/user_roles";
import { authReducer } from "./reducer";
import { AuthState } from "@/types/types/contexts/states";
import { Client, Employee } from "@/types/types/model/users";
import { AuthActionTypes } from "@/types/types/contexts/actions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import shopAndGoAPI from "@/utils/axios";
import { GetProfileResponse } from "@/types/types/api/auth";
import { ADMIN_ROUTES, CLIENT_ROUTES, DELIVERY_MAN_ROUTES, GUEST_ROUTES, SALES_EXECUTIVE_ROUTES } from "@/utils/constants";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { getDefaultPageForRole, isRouteInRoutesArray } from "@/utils/routing";

type AuthProviderProps = {
  children: ReactNode;
};

const AUTH_BASE_STATE: AuthState = {
  role: UserRoles.GUEST,
  clientProfile: null,
  employeeProfile: null
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_BASE_STATE);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const ROUTE_ROLE_MAP = useMemo(() => ({
    [UserRoles.ADMINISTRATOR]: ADMIN_ROUTES,
    [UserRoles.CLIENT]: CLIENT_ROUTES,
    [UserRoles.SALES_EXECUTIVE]: SALES_EXECUTIVE_ROUTES,
    [UserRoles.DELIVERY_MAN]: DELIVERY_MAN_ROUTES,
    [UserRoles.GUEST]: GUEST_ROUTES,
  }), []);

  const startSession= useCallback((profile: Client | Employee) => {
    if("position" in profile) {
      dispatch({ type: AuthActionTypes.START_EMPLOYEE_SESSION, payload: profile });
    } else {
      dispatch({ type: AuthActionTypes.START_CLIENT_SESSION, payload: profile });
    }
  }, []);

  const redirectToRequestedPage = useCallback((profileRole: UserRoles) => {
    const requestedPage = searchParams.get("p");
    
    router.replace(
      requestedPage ?? getDefaultPageForRole(profileRole)
    );
  }, [router, searchParams]);

  const login = useCallback((profile: Employee | Client) => {
    startSession(profile);
    redirectToRequestedPage("position" in profile ? profile.position : UserRoles.CLIENT);
  }, [redirectToRequestedPage, startSession]);

  const logout = useCallback(() => {
    Cookies.remove("token");
    dispatch({ type: AuthActionTypes.END_SESSION });
    router.replace("/iniciar-sesion");
  }, [router]);

  const refreshSession = useCallback(async() => {
    try {
      const { data: profile } = await shopAndGoAPI.get<GetProfileResponse>("/sessions/profile");
      startSession(profile);
    } catch {
      logout();
    } finally {
      setIsLoadingProfile(false);
    }
  }, [startSession, logout]);

  useEffect(() => {
    const isProtectedPage = 
      ADMIN_ROUTES.includes(pathname) || 
      isRouteInRoutesArray(pathname, SALES_EXECUTIVE_ROUTES) ||
      DELIVERY_MAN_ROUTES.includes(pathname) ||
      (CLIENT_ROUTES.includes(pathname) && Cookies.get("token"));

    if(
      isProtectedPage 
      && state.clientProfile === null 
      && state.employeeProfile === null
    ) {
      refreshSession();
    } else {
      setIsLoadingProfile(false);
    }
  }, [pathname, state.clientProfile, state.employeeProfile, refreshSession]);

  useEffect(() => {
    const userRole = state.employeeProfile?.position || (state.clientProfile && UserRoles.CLIENT) || UserRoles.GUEST;
    const allowedRoutes = ROUTE_ROLE_MAP[userRole] || [];
    const isAllowedRoute = isRouteInRoutesArray(pathname, allowedRoutes);

    if(!isAllowedRoute && !isLoadingProfile) {
      if(userRole === UserRoles.GUEST) {
        const login = `/iniciar-sesion?p=${pathname}`;
        router.replace(login);
      }

      router.replace(getDefaultPageForRole(userRole));
    }
  }, [state.employeeProfile, state.clientProfile, pathname, ROUTE_ROLE_MAP, router, isLoadingProfile]);

  const updateClientProfile = useCallback((profile: Client) => {
    dispatch({ type: AuthActionTypes.UPDATE_CLIENT_PROFILE, payload: profile });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateClientProfile
      }}
    >
      {
        isLoadingProfile
        ? <FullScreenLoader/>
        : children
      }
    </AuthContext.Provider>
  )
}