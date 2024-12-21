import { StoreNavbar } from "./_components/StoreNavbar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-gray-300">
        <StoreNavbar/>
      </header>
      {children}
    </>
  );
}