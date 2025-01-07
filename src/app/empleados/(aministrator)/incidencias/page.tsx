import { Metadata } from "next";
import { IncidentsSecion } from "./_components/IncidentsSection";

export const metadata: Metadata = {
  title: "Reportes de incidencias"
};

export default function AdminIncidentsPage() {
  return (
    <main className="px-3 md:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <h1>Reportes de incidencias</h1>
      
      <IncidentsSecion/>
    </main>
  );
}