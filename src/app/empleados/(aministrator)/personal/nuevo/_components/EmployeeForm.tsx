import { FULL_NAME_PATTERN, SECURE_PASSWORD_PATTERN, USERNAME_PATTERN } from "@/utils/regexp";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { SecondaryIconButton } from "@/components/buttons/SecondaryIconButton";
import { validateRegistrationDate } from "@/utils/date";
import UserRoles from "@/types/enums/user_roles";
import { useEmployeeForm } from "../hooks/useEmployeeForm"
import { useEffect } from "react";
import { useStores } from "../hooks/useStores";
import { useEmployeePositions } from "../hooks/useEmployeePositions";

export const EmployeeForm = () => {
    const { 
            handleSubmit, 
            errors, 
            register, 
            showPassword,
            isLoadingRegister, 
            setShowPassword
        } = useEmployeeForm();

    const {
        storesList,
        recoverStoresList
    } = useStores();

    const {
        positionsList,
        recoverPositionsList
    } = useEmployeePositions();

    useEffect(() => {
        recoverStoresList();
    }, [recoverStoresList]);

    useEffect(() => {
        recoverPositionsList();
    }, [recoverPositionsList]);

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className={`form-group col-span-2 ${errors.fullName ? "invalid" : ""}`}>
                <label htmlFor="fullName">Nombre completo</label>
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
                />
                <p className="error">
                    {
                        "Nombre completo inválido. Se deben incluir al menos nombre y apellido."
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 md:col-span-1 ${errors.registrationDate ? "invalid" : ""}`}>
                <label htmlFor="registrationDate">Fecha de ingreso</label>
                <input
                    {
                        ...register(
                            "registrationDate", 
                            { 
                                required: "Este campo es obligatorio.",
                                validate: validateRegistrationDate,
                            }
                        ) 
                    }
                    id="registrationDate" type="date"
                />
                <p className="error">
                    {
                        errors.registrationDate?.message
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 md:col-span-1 ${errors.position ? "invalid" : ""}`}>
                <label htmlFor="position">Cargo</label>
                <select
                    {
                        ...register(
                            "position",
                            {
                                required: true,
                                validate: (value) => Number(value) !== 0
                            }
                        )
                    }
                    id="position"
                >
                    <option value={0} disabled>
                        {
                            positionsList.error
                            ? "Lista de cargos no disponible"
                            : "Seleccione un cargo"
                        }
                    </option>
                    {
                        positionsList.value.map(position => (
                            <option key={position.id} value={position.id}>{position.title}</option>
                        ))
                    }
                </select>
                <p className="error">
                    {
                        "Debes seleccionar un puesto"
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 md:col-span-1 ${errors.store ? "invalid" : ""}`}>
                <label htmlFor="store">Sucursal</label>
                <select
                    {
                        ...register(
                            "store",
                            {
                                required: true,
                                validate: (value) => Number(value) !== 0
                            }
                        )
                    }
                    id="store"
                >
                    <option value={0} disabled>
                        {
                            storesList.error
                            ? "Lista de sucursales no disponible"
                            : "Seleccione un repartidor"
                        }
                    </option>
                    {
                        storesList.value.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))
                    }
                </select>
                <p className="error">
                    {
                        "Debes seleccionar una sucursal"
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 md:col-span-1 ${errors.user ? "invalid" : ""}`}>
                <label htmlFor="user">Usuario</label>
                <input
                    {
                        ...register(
                            "user", 
                            { 
                                required: true,
                                maxLength: 200,
                                pattern: USERNAME_PATTERN
                            }
                        ) 
                    }
                    id="user" type="text" placeholder="Ej. Admin123"
                />
                <p className="error">
                    {
                        "Nombre completo inválido. Se deben incluir al menos nombre y apellido."
                    }
                </p>
            </div>

            <div className={`form-group col-span-2 ${errors.password ? "invalid" : ""}`}>
                <label htmlFor="password">Contraseña</label>
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
                                }
                            )
                        }
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="flex-1"
                    />
                    <SecondaryIconButton
                        type="button"
                        className="toggle-password ml-1"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
                    </SecondaryIconButton>
                </div>
                <p className="error">
                    {
                        errors.password?.message
                    }
                </p>
            </div>
            
            <div className="col-start-2 flex justify-end mt-8">
                <PrimaryButton disabled={isLoadingRegister} className="w-auto">
                    {isLoadingRegister ? "Cargando..." : "Crear cuenta"}
                </PrimaryButton>
            </div>
        </form>
    );
}