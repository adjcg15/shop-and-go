"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { usePaymentMethodForm } from "../_hooks/usePaymentMethodForm";
import {
    CARD_IS_VISA_OR_MASTERCARD,
    CVV_PATTERN,
    MONTH_PATTERN,
    ONLY_LETTERS_PATTERN,
    YEAR_PATTERN,
} from "@/utils/regexp";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

export const PaymentMethodForm = () => {
    const {
        register,
        errors,
        handleSubmit,
        isLoadingRegister,
        validateLuhn,
        handleIssuerChange,
        issuingBanks,
        issuerColor,
    } = usePaymentMethodForm();

    return !issuingBanks.loading ? (
        !issuingBanks.error ? (
            issuingBanks.value.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <div
                        className={`form-group ${
                            errors.cardholderName ? "invalid" : ""
                        }`}
                    >
                        <label htmlFor="carholderName">
                            Titular de la tarjeta
                        </label>
                        <input
                            id="carholderName"
                            type="text"
                            placeholder="Ej. Rodrigo Aguilar López"
                            {...register("cardholderName", {
                                required: true,
                                maxLength: 64,
                                pattern: ONLY_LETTERS_PATTERN,
                            })}
                        />
                        <p className="error">
                            Debe ingresar el nombre del titular
                        </p>
                    </div>
                    <div
                        className={`form-group ${
                            errors.cardNumber ? "invalid" : ""
                        }`}
                    >
                        <label htmlFor="cardNumber">
                            Número de tarjeta (Visa o Mastercard)
                        </label>
                        <input
                            id="cardNumber"
                            type="text"
                            placeholder="Ej. 5474925432670366"
                            {...register("cardNumber", {
                                required: true,
                                pattern: CARD_IS_VISA_OR_MASTERCARD,
                                validate: (value) => validateLuhn(value),
                            })}
                        />
                        <p className="error">
                            Debe ingresar un número de tarjeta válido a 16
                            dígitos (Visa o Mastercard)
                        </p>
                    </div>
                    <div
                        className={`form-group ${
                            errors.bankIssuer ? "invalid" : ""
                        }`}
                    >
                        <label htmlFor="bankIssuer">Banco emisor</label>
                        <select
                            id="bankIssuer"
                            defaultValue=""
                            className={`${
                                errors.bankIssuer ? "border-red-600" : ""
                            } ${issuerColor}`}
                            {...register("bankIssuer", {
                                required: true,
                                onChange: (e) => handleIssuerChange(e),
                            })}
                        >
                            <option value="" disabled>
                                Selecciona el banco emisor
                            </option>
                            {issuingBanks.value.map((issuer) => (
                                <option
                                    key={issuer.id}
                                    value={issuer.id}
                                    className="text-gray-800"
                                >
                                    {issuer.name}
                                </option>
                            ))}
                        </select>
                        <p className="error">
                            Debe seleccionar un banco emisor
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className={`col-span-1 form-group ${
                                errors.expirationMonth ? "invalid" : ""
                            }`}
                        >
                            <label htmlFor="expirationMonth">
                                Mes de vencimiento
                            </label>
                            <input
                                id="expirationMonth"
                                type="text"
                                placeholder="Ej. 06"
                                className="w-full col-span-1"
                                {...register("expirationMonth", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 2,
                                    pattern: MONTH_PATTERN,
                                })}
                            />
                            <p className="error">Debe ingresar un mes válido</p>
                        </div>
                        <div
                            className={`col-span-1 form-group ${
                                errors.expirationYear ? "invalid" : ""
                            }`}
                        >
                            <label htmlFor="expirationYear">
                                Año de vencimiento
                            </label>
                            <input
                                id="expirationYear"
                                type="text"
                                placeholder="Ej. 28"
                                className="w-full col-span-1"
                                {...register("expirationYear", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 2,
                                    pattern: YEAR_PATTERN,
                                })}
                            />
                            <p className="error">Debe ingresar un año válido</p>
                        </div>
                        <div
                            className={`form-group col-start-3 ${
                                errors.cvv ? "invalid" : ""
                            }`}
                        >
                            <label htmlFor="cvv">CVV / CVC</label>
                            <input
                                id="cvv"
                                type="text"
                                placeholder="Ej. 123"
                                className="w-full"
                                {...register("cvv", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 3,
                                    pattern: CVV_PATTERN,
                                })}
                            />
                            <p className="error">
                                Debe ingresar el CVV a 3 dígitos
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <PrimaryButton disabled={isLoadingRegister}>
                            {isLoadingRegister
                                ? "Registrando..."
                                : "Registrar tarjeta"}
                        </PrimaryButton>
                    </div>
                </form>
            )
        ) : (
            <div className="col-start-1 col-span-4 mt-2">
                <ErrorBanner
                    image={{
                        src: "/illustrations/empty-cart.svg",
                        alt: "Imagen representativa de emisores bancarios no cargados",
                    }}
                    title={"¡Error al cargar las emisores bancarios!"}
                    message={issuingBanks.error}
                />
            </div>
        )
    ) : (
        <div className="col-start-1 col-span-4 mt-2">
            <p className="text-center mt-36 text-2xl">
                Cargando emisores bancarios...
            </p>
        </div>
    );
};
