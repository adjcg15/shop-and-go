import { Employee, Client } from "../model/users";

export enum AuthActionTypes {
  START_EMPLOYEE_SESSION = "[Auth] Start employee session",
  START_CLIENT_SESSION = "[Auth] Start client session",
  END_SESSION = "[Auth] End session"
};

type AuthActions = 
  { type: AuthActionTypes.START_EMPLOYEE_SESSION, payload: Employee }
  | { type: AuthActionTypes.START_CLIENT_SESSION, payload: Client }
  | { type: AuthActionTypes.END_SESSION }

export type {
  AuthActions
};