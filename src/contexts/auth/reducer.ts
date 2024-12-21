import UserRoles from "@/types/enums/user_roles";
import { AuthActions, AuthActionTypes } from "@/types/types/contexts/actions";
import { AuthState } from "@/types/types/contexts/states";

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch(action.type) {
    case AuthActionTypes.START_CLIENT_SESSION:
      return {
        ...state,
        role: UserRoles.CLIENT,
        clientProfile: action.payload,
        employeeProfile: null
      };
    case AuthActionTypes.START_EMPLOYEE_SESSION:
      return {
        ...state,
        role: action.payload.position,
        clientProfile: null,
        employeeProfile: action.payload
      };
    case AuthActionTypes.END_SESSION:
      return {
        ...state,
        role: UserRoles.GUEST,
        clientProfile: null,
        employeeProfile: null
      };
    default:
      return state;
  }
}