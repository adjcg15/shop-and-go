import { Metadata } from "next";
import { ProductToModifyWrapper } from "../../../../../components/ui/ProductToModifyWrapper";
export const metadata: Metadata = {
    title: "Modificación de producto",
};

const ModifyProductPage = () => {
    return <ProductToModifyWrapper />;
};

export default ModifyProductPage;
