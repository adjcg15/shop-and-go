"use client";
import { StoreForm } from "@/components/forms/StoreForm";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const CreateStoreForm = () => {
  const router = useRouter();

  const handleCreationCompleted = useCallback(() => {
    router.push("/empleados/sucursales");
  }, [router]);

  const handleDiscardCreation = useCallback(() => {
    router.push("/empleados/sucursales");
  }, [router]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}>
      <StoreForm
        onDiscard={handleDiscardCreation}
        onSubmitComplete={handleCreationCompleted}
      />
    </APIProvider>
  );
}
