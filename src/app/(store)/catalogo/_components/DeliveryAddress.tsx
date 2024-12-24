"use client";
import StoreContext from "@/contexts/store/context";
import { useContext } from "react";
import { LuMapPin } from "react-icons/lu";

export const DeliveryAddress = () => {
  const { deliveryAddress } = useContext(StoreContext);

  return (
    deliveryAddress 
    ? (
      <div className="flex mb-10">
        <LuMapPin size={20} className="text-orange-500" style={{marginTop: "2px"}}/>
        <div className="ml-2">
          <p className="font-medium">Entrega en</p>
          <p className="text-slate-500">{`${deliveryAddress.street} ${deliveryAddress.streetNumber}, ${deliveryAddress.postalCode}`}</p>
        </div>
      </div>
    )
    : null
  );
}
