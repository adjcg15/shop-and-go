"use client";
import Image from "next/image";
import { UserTypeSelector } from "./UserTypeSelector";
import { LoginForm } from "./LoginForm";
import { useState } from "react";

export const FormWrapper = () => {
  const [isEmployee, setIsEmployee] = useState(false);

  return (
    <>
      <header className="flex flex-col items-center">
        <Image priority src="logo-with-name.svg" alt="Logo de Shop&Go con nombre incluido" width={150} height={150}/>
        <UserTypeSelector isEmployee={isEmployee} setIsEmployee={setIsEmployee}/>
      </header>
      <main>
        <LoginForm isUserEmployee={isEmployee}/>
      </main>
    </>
  );
}
