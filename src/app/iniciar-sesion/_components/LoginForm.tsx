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
        <label htmlFor="credentials">{!isUserEmployee ? "Número de teléfono" : "Usuario"} <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
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
          aria-describedby="credentialsInputDescription"
        />
        <p className="sr-only" id="credentialsInputDescription">
          { isUserEmployee ? "Número de teléfono a 10 dígitos" : "Usuario que le asignaron cuando lo registraron en el sistema" }
        </p>
        <p className="error">
          {
            !isUserEmployee
            ? "Ingrese su número de celular a 10 dígitos"
            : "Nombre de usuario inválido"
          }
        </p>
      </div>

      <div className={`form-group ${errors.password ? "invalid" : ""}`}>
        <label htmlFor="password">Contraseña <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
        <input
          {...register("password", { required: true, validate: (value) => value.trim() !== "" })}
          id="password" type="password"
          aria-describedby="passwordInputDescription"
        />
        <p className="sr-only" id="passwordInputDescription">Contraseña de su cuenta</p>
        <p className="error">Ingrese su contraseña para continuar</p>
        <div className="mt-1 flex justify-end">
          <Link href="/recuperar-contrasenia">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <PrimaryButton disabled={isLoadingLogin} aria-describedby="loginButtonDescription">
          {isLoadingLogin ? "Cargando..." : "Ingresar"}
        </PrimaryButton>
        <p className="sr-only" id="loginButtonDescription">Verificar información ingresada para acceder al sistema</p>
      </div>
    </form>
  );
}
