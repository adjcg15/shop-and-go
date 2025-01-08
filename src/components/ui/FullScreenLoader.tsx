import Image from "next/image";
import React from "react";

export const FullScreenLoader = () => {
  return (
    <div style={{ height: "100vh"}} className="flex justify-center items-center w-screen">
      <Image priority src="/plain-logo.svg" alt="Logo de la tienda sin texto" width={70} height={70} className="rotate"/>
    </div>
  );
}
