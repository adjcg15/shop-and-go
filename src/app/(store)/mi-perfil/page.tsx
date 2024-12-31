import { Metadata } from "next";
import { ClientInfoWrapper } from "./_components/ClientInfoWrapper";

export const metadata: Metadata = {
  title: "Mi Perfil",
};

export default function MyProfilePage() {
  return (
    <div className="px-5 sm:px-4 lg:px-6 max-w-screen-md mx-auto pt-8 pb-8 bg-white shadow-md rounded-md">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Mi Perfil
        </h1>
      </header>
      <ClientInfoWrapper />
    </div>
  );
}
