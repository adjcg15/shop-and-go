import { StoreProvider } from "@/contexts/store/Provider";
import { StoreNavbar } from "./_components/StoreNavbar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <header className="border-b border-gray-300 fixed top-0 w-full bg-white z-20">
        <StoreNavbar/>
      </header>
      <div className="mt-20 md:mt-24">
        {children}
      </div>
    </StoreProvider>
  );
}