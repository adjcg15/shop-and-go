import { Metadata } from "next";
import { AdminProductsPageBody } from "@/components/ui/AdminProductsPageBody";

export const metadata: Metadata = {
    title: "Productos en inventario",
};

export default function AdminProductsPage() {
    return <AdminProductsPageBody />;
}
