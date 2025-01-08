import { useClientForm } from "../_hooks/useClientForm";
import { FULL_NAME_PATTERN, PHONE_NUMBER_PATTERN, SECURE_PASSWORD_PATTERN } from "@/utils/regexp";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { SecondaryIconButton } from "@/components/buttons/SecondaryIconButton";
import { validateBirthdate } from "@/utils/date";

export const ClientForm = () => {
    const { 
        handleSubmit, 
        errors, 
        register, 
        showPassword, 
        showPasswordConfirmation, 
        isLoadingRegister, 
        setShowPassword, 
        setShowPasswordConfirmation,
        password,
        passwordConfirmation
    } = useClientForm();

    function validatePasswordConfirmation(): string | true {
        if (password !== passwordConfirmation) {
            return "Las contraseñas no coinciden.";
        }

        return true;
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className={`form-group col-span-2 ${errors.fullName ? "invalid" : ""}`}>
                <label htmlFor="fullName">Nombre completo <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
                <input
                    {
                        ...register(
                            "fullName", 
                            { 
                                required: true,
                                maxLength: 200,
                                pattern: FULL_NAME_PATTERN
                            }
                        ) 
                    }
                    id="fullName" type="text" placeholder="Ej. José Pérez"
                    aria-describedby="clientNameInputDescription"
                />
                <p className="sr-only" id="clientNameInputDescription">Nombre de pila y apellidos</p>
                <p className="error">
                    {
                        "Nombre completo inválido. Se deben incluir al menos nombre y apellido."
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 md:col-span-1 ${errors.phoneNumber ? "invalid" : ""}`}>
                <label htmlFor="phoneNumber">Número de teléfono <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
                <input
                    {
                        ...register(
                            "phoneNumber", 
                            { 
                                required: true,
                                maxLength: 10,
                                pattern: PHONE_NUMBER_PATTERN
                            }
                        ) 
                    }
                    id="phoneNumber" type="number" placeholder="Ej. 2288103221"
                    aria-describedby="clientPhoneNumberInputDescription"
                />
                <p className="sr-only" id="clientPhoneNumberInputDescription">Número de teléfono a 10 dígitos</p>
                <p className="error">
                    {
                        "Número telefónico inválido. Debe contener 10 dígitos."
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 md:col-span-1 ${errors.birthdate ? "invalid" : ""}`}>
                <label htmlFor="birthdate">Fecha de nacimiento <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
                <input
                    {
                        ...register(
                            "birthdate", 
                            { 
                                required: "Este campo es obligatorio.",
                                validate: validateBirthdate,
                            }
                        ) 
                    }
                    id="birthdate" type="date"
                    aria-describedby="clientBirthdateInputDescription"
                />
                <p className="sr-only" id="clientBirthdateInputDescription">Fecha de nacimiento con número de día, número de mes y año</p>
                <p className="error">
                    {
                        errors.birthdate?.message
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 ${errors.password ? "invalid" : ""}`}>
                <label htmlFor="password">Contraseña <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
                <div className="password-container flex items-center">
                    <input
                        {
                            ...register(
                                "password", 
                                {
                                    required: "Necesitas ingresar una contraseña.",
                                    pattern: 
                                    {
                                        value: SECURE_PASSWORD_PATTERN,
                                        message: "La contraseña debe tener entre 8 y 16 caracteres, incluir 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial."
                                    },
                                    maxLength: 16,
                                    validate: validatePasswordConfirmation
                                }
                            )
                        }
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="flex-1"
                        aria-describedby="passwordInputDescription"
                    />
                    <p className="sr-only" id="passwordInputDescription">Contraseña con 8 a 16 caracteres, con una mayúscula, una minúscula, un número y un caracter especial</p>
                    <SecondaryIconButton
                        type="button"
                        className="toggle-password ml-1"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-describedby="showPasswordButtonDescription"
                    >
                        {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
                    </SecondaryIconButton>
                    <p className="sr-only" id="showPasswordButtonDescription">
                        { showPassword ? "Ocultar contraseña" : "Mostrar contraseña" }
                    </p>
                </div>
                <p className="error">
                    {
                        errors.password?.message
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 ${errors.passwordConfirmation ? "invalid" : ""}`}>
                <label htmlFor="passwordConfirmation">Confirmar Contraseña <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
                <div className="password-container flex items-center">
                    <input
                        {
                            ...register(
                                "passwordConfirmation", 
                                {
                                    required: "Necesitas confirmar tu contraseña.",
                                    maxLength: 16,
                                    validate: validatePasswordConfirmation,
                                }
                            )
                        }
                        id="passwordConfirmation"
                        type={showPasswordConfirmation ? "text" : "password"}
                        className="flex-1"
                        aria-describedby="passwordConfirmationInputDescription"
                    />
                    <p className="sr-only" id="passwordConfirmationInputDescription">Confirmación de la contraseña con 8 a 16 caracteres, con una mayúscula, una minúscula, un número y un caracter especial</p>
                    <SecondaryIconButton
                        type="button"
                        className="toggle-password ml-1"
                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        aria-describedby="showPasswordConfirmationButtonDescription"
                    >
                        {showPasswordConfirmation ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
                    </SecondaryIconButton>
                    <p className="sr-only" id="showPasswordConfirmationButtonDescription">
                        { showPassword ? "Ocultar contraseña" : "Mostrar contraseña" }
                    </p>
                </div>
                <p className="error">
                    {
                        errors.passwordConfirmation?.message
                    }
                </p>
            </div>

            <div className="col-start-2 flex justify-end mt-8">
                <PrimaryButton disabled={isLoadingRegister} className="w-auto" aria-describedby="createAccountButtonDescription">
                    {isLoadingRegister ? "Cargando..." : "Crear cuenta"}
                </PrimaryButton>
                <p className="sr-only" id="createAccountButtonDescription">Registrar una nueva cuenta de cliente con los datos ingresados</p>
            </div>
        </form>
    );
}