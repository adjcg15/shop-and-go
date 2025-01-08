import UserRoles from "@/types/enums/user_roles";

type Client = {
  birthdate: string;
  fullName: string;
  id: number;
  phoneNumber: string;
};

type Employee = {
  fullName: string;
  id: number;
  idPosition: number;
  position: UserRoles;
  idStore: number;
  isActive: boolean;
  isAvailableForWork: boolean;
  registrationDate: string;
};

type EmployeePosition = {
  id: number;
  title: string;
}

export type {
  Client,
  Employee,
  EmployeePosition
};