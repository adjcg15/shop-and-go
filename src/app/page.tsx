"use client";
import Image from "next/image";
import Link from "next/link";
import { UserTypeSelector } from "./_components/UserTypeSelector";
import { LoginForm } from "./_components/LoginForm";
import { useState } from "react";

export default function Login() {
  const [isEmployee, setIsEmployee] = useState(false);

  return (
    <div className="my-20 mx-auto max-w-md px-5">
      <header className="flex flex-col items-center">
        <Image src="logo-with-name.svg" alt="Logo de SHop&Go con nombre incluido" width={150} height={150}/>
        <UserTypeSelector isEmployee={isEmployee} setIsEmployee={setIsEmployee}/>
      </header>
      <main>
        <LoginForm isUserEmployee={isEmployee}/>
      </main>

      <footer className="flex justify-center mt-8">
        <p>¿Eres nuevo? <Link href="crear-cuenta">Regístrate aquí</Link></p>
      </footer>
    </div>
  );
}
