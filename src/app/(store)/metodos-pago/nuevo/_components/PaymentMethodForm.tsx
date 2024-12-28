"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";

export const PaymentMethodForm = () => {
  return (
    <form>
      <div className="form-group">
        <label>Titular de la tarjeta</label>
        <input
          id="carholderName"
          type="text"
          placeholder="Ingrese el nombre del titular"
        />
        <p className="error">Debe ingresar el nombre del titular</p>
      </div>
      <div className="form-group">
        <label>Número de tarjeta</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="Ingrese el número de tarjeta"
        />
        <p className="error">Debe ingresar el número de tarjeta a 16 dígitos</p>
      </div>
      <div className="form-group">
        <label>Banco emisor</label>
        <select
          id="banksIssuers"
          defaultValue=""
          className="form-group text-gray-400"
        >
          <option value="" disabled>
            Selecciona el banco emisor
          </option>
        </select>
        <p className="error">Debe seleccionar un banco emisor</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col form-group">
          <label>Fecha de vencimiento</label>
          <div className="flex space-x-2">
            <input
              id="expiryMonth"
              type="text"
              placeholder="MM"
              className="w-1/2"
            />
            <input
              id="expiryYear"
              type="text"
              placeholder="AA"
              className="w-1/2"
            />
          </div>
          <p className="error">Debe ingresar la fecha</p>
        </div>
        <div className="flex flex-col form-group">
          <label>CVV</label>
          <input id="cvv" type="text" placeholder="CVV" className="w-full" />
          <p className="error">Debe ingresar el cvv</p>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <PrimaryButton>Registrar tarjeta</PrimaryButton>
      </div>
    </form>
  );
};
