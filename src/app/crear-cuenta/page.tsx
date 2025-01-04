import { Metadata } from "next";
import { FormWrapper } from "./_components/FormWrapper";

export const metadata : Metadata = {
    title: "Nueva cuenta"
} 

export default function CrearCuenta() {
    return (
        <div className="my-20 mx-auto max-w-md px-5">
          <FormWrapper />
        </div>
      );
}