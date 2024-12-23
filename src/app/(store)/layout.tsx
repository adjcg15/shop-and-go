import { StoreProvider } from "@/contexts/store/Provider";
import { StoreNavbar } from "./_components/StoreNavbar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <header className="border-b border-gray-300">
        <StoreNavbar/>
      </header>
      {children}
    </StoreProvider>
  );
}