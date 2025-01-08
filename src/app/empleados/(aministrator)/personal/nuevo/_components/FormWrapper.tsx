"use client";
import { EmployeeForm } from "./EmployeeForm";

export const FormWrapper = () => {

  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Nuevo trabajador
        </h1>
      </header>
      <main>
        <EmployeeForm/>
      </main>
    </>
  );
}