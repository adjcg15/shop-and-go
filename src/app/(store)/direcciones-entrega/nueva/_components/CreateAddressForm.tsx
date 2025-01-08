"use client";
import { AddressForm } from "@/app/(store)/_components/AddressForm";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

export const CreateAddressForm = () => {
    const router = useRouter();

    const handleSuccess = () => {
        router.back();
    }

  return (
    <>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
            <AddressForm onSubmitComplete={handleSuccess} />
        </APIProvider>
    </>
  );
};
