import { Client, Employee } from "../model/users";

type ClientLoginResponse = Client & {
  token: string;
};

type EmployeeLoginResponse = Employee & {
  token: string;
}

type LoginResponse = ClientLoginResponse | EmployeeLoginResponse;

type GetProfileResponse = Client | Employee;

export type {
  LoginResponse,
  GetProfileResponse
};