import UserRoles from "@/types/enums/user_roles";
import { Client, Employee } from "../model/users";

type AuthState = {
  role: UserRoles,
  clientProfile: Client| null,
  employeeProfile: Employee | null
};

export type {
  AuthState
};