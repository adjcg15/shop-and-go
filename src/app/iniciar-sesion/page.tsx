import Link from "next/link";
import { FormWrapper } from "./_components/FormWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de sesión para clientes y empleados"
};

export default function Login() {

  return (
    <div className="my-20 mx-auto max-w-md px-5">
      <FormWrapper />

      <footer className="flex justify-center mt-8">
        <p>¿Eres nuevo? <Link href="crear-cuenta">Regístrate aquí</Link></p>
      </footer>
    </div>
  );
}
