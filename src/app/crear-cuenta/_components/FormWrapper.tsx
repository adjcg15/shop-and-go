"use client";
import { ClientForm } from "./ClientForm";
import Image from "next/image";

export const FormWrapper = () => {

  return (
    <>
      <header className="flex flex-col items-center">
        <Image priority src="plain-logo.svg" alt="Logo de Shop&Go con nombre incluido" width={150} height={150}/>
        <h1>Nueva cuenta</h1>
      </header>
      <main>
        <ClientForm/>
      </main>
    </>
  );
}