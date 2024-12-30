"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { usePaymentMethod } from "../_hooks/usePaymentMethodForm";
import {
    CVV_PATTERN,
    MONTH_PATTERN,
    ONLY_LETTERS_PATTERN,
    YEAR_PATTERN,
} from "@/utils/regexp";
import { useCallback } from "react";

export const PaymentMethodForm = () => {
    const {
        register,
        errors,
        handleSubmit,
        isLoadingRegister,
        handleIssuerChange,
        issuingBanks,
        issuerColor,
    } = usePaymentMethod();

    const validateLuhn = useCallback((cardNumber: string) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i], 10);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    }, []);

    return !issuingBanks.error ? (
        <form onSubmit={handleSubmit}>
            <div
                className={`form-group ${
                    errors.cardholderName ? "invalid" : ""
                }`}
            >
                <label>Titular de la tarjeta</label>
                <input
                    id="carholderName"
                    type="text"
                    placeholder="Ingrese el nombre del titular"
                    {...register("cardholderName", {
                        required: true,
                        maxLength: 64,
                        pattern: ONLY_LETTERS_PATTERN,
                    })}
                />
                <p className="error">Debe ingresar el nombre del titular</p>
            </div>
            <div className={`form-group ${errors.cardNumber ? "invalid" : ""}`}>
                <label>Número de tarjeta</label>
                <input
                    id="cardNumber"
                    type="text"
                    placeholder="Ingrese el número de tarjeta"
                    {...register("cardNumber", {
                        required: true,
                        minLength: 16,
                        maxLength: 16,
                        validate: (value) => validateLuhn(value),
                    })}
                />
                <p className="error">
                    Debe ingresar el número de tarjeta válido a 16 dígitos
                </p>
            </div>
            <div className={`form-group ${errors.bankIssuer ? "invalid" : ""}`}>
                <label>Banco emisor</label>
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
                    {issuingBanks.value?.map((issuer) => (
                        <option
                            key={issuer.id}
                            value={issuer.id}
                            className="text-gray-800"
                        >
                            {issuer.name}
                        </option>
                    ))}
                </select>
                <p className="error">Debe seleccionar un banco emisor</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className={`flex form-group flex-col ${
                        errors.expirationMonth || errors.expirationYear
                            ? "invalid"
                            : ""
                    } `}
                >
                    <label>Fecha de vencimiento</label>
                    <div className="flex space-x-2">
                        <input
                            id="expirationMonth"
                            type="text"
                            placeholder="MM"
                            className={`w-1/2 ${
                                errors.expirationMonth ? "border-red-600" : ""
                            }`}
                            {...register("expirationMonth", {
                                required: true,
                                minLength: 2,
                                maxLength: 2,
                                pattern: MONTH_PATTERN,
                            })}
                        />
                        <input
                            id="expirationYear"
                            type="text"
                            placeholder="AA"
                            className={`w-1/2 ${
                                errors.expirationYear ? "border-red-600" : ""
                            }`}
                            {...register("expirationYear", {
                                required: true,
                                minLength: 2,
                                maxLength: 2,
                                pattern: YEAR_PATTERN,
                            })}
                        />
                    </div>
                    {(errors.expirationMonth || errors.expirationYear) && (
                        <p className="error text-red-600 text-sm mt-1">
                            Debe ingresar la fecha correctamente
                        </p>
                    )}
                </div>
                <div
                    className={`flex form-group flex-col ${
                        errors.cvv ? "invalid" : ""
                    }`}
                >
                    <label>CVV</label>
                    <input
                        id="cvv"
                        type="text"
                        placeholder="CVV / CVC"
                        className="w-full"
                        {...register("cvv", {
                            required: true,
                            minLength: 3,
                            maxLength: 3,
                            pattern: CVV_PATTERN,
                        })}
                    />
                    <p className="error">Debe ingresar el CVV a 3 dígitos</p>
                </div>
            </div>
            <div className="mt-5 flex justify-end">
                <PrimaryButton disabled={isLoadingRegister}>
                    {isLoadingRegister ? "Registrando..." : "Registrar tarjeta"}
                </PrimaryButton>
            </div>
        </form>
    ) : (
        <div className="flex justify-center items-center h-full">
            <p className="text-center mt-36 text-2xl gap-8">
                {issuingBanks.error}
            </p>
        </div>
    );
};
