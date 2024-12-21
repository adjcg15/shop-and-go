import { PHONE_NUMBER_PATTERN, USERNAME_PATTERN } from "@/utils/regexp";
import { FC } from "react";
import { useLoginForm } from "../_hooks/useLoginForm";
import Link from "next/link";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

type LoginFormProps = {
  isUserEmployee: boolean;
};

export const LoginForm: FC<LoginFormProps> = ({ isUserEmployee }) => {
  const { handleSubmit, errors, register, isLoadingLogin } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <div className={`form-group ${errors.credentials ? "invalid" : ""}`}>
        <label htmlFor="credentials">{!isUserEmployee ? "Número de teléfono" : "Usuario"}</label>
        <input 
          {
            ...register(
              "credentials", 
              { 
                required: true, 
                maxLength: isUserEmployee ? undefined : 10,  
                pattern: isUserEmployee ? USERNAME_PATTERN : PHONE_NUMBER_PATTERN 
              }
            )
          }
          id="credentials" 
          type={!isUserEmployee ? "number" : "text"}
        />
        <p className="error">
          {
            !isUserEmployee
            ? "Ingrese su número de celular a 10 dígitos"
            : "Nombre de usuario inválido"
          }
        </p>
      </div>

      <div className={`form-group ${errors.password ? "invalid" : ""}`}>
        <label htmlFor="password">Contraseña</label>
        <input
          {...register("password", { required: true, validate: (value) => value.trim() !== "" })}
          id="password" type="password"
        />
        <p className="error">Ingrese su contraseña para continuar</p>
        <div className="mt-1 flex justify-end">
          <Link href="/recuperar-contrasenia">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <PrimaryButton disabled={isLoadingLogin}>Ingresar</PrimaryButton>
      </div>
    </form>
  );
}
