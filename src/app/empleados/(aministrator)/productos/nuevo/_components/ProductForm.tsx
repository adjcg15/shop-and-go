"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useProductForm } from "../_hooks/useProductForm";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { ONLY_POSITIVE_INTEGERS } from "@/utils/regexp";
import { InventoriesByStore } from "./InventoriesByStore";
import { FC } from "react";

type ProductProps = {
    product?: {
        id: number;
        barCode: string;
        name: string;
        description: string;
        imageUrl: string;
        isActive: boolean;
        salePrice: number;
        maximumAmount: number;
        idCategory: number;
    };
    inventories?: {
        id: number;
        stock: number;
        expirationDate: string;
        idStore: number;
        idProduct: number;
    }[];
};

export const ProductForm: FC<ProductProps> = ({ product, inventories }) => {
    const {
        register,
        errors,
        handleSubmit,
        isLoadingRegister,
        handleCategoryChange,
        handleImageChange,
        getGenerateCode,
        productCategories,
        inventoriesOnForm,
        handleInventoryChange,
        handleProductStateChange,
        selectedOptionProductState,
        stores,
        categoryColor,
    } = useProductForm(product, inventories);

    return !productCategories.loading && !stores.loading ? (
        !productCategories.error && !stores.error ? (
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex items-center space-x-2">
                    <div
                        className={`form-group flex-1 ${
                            errors.barCode ? "invalid" : ""
                        }`}
                    >
                        <label>Código de barras</label>
                        <input
                            id="barCode"
                            type="text"
                            defaultValue={product ? product.barCode : ""}
                            disabled={product ? true : false}
                            placeholder="Ej. 1234567890123"
                            {...register("barCode", {
                                required: true,
                                maxLength: 13,
                                minLength: 13,
                                pattern: ONLY_POSITIVE_INTEGERS,
                            })}
                            className={`w-full ${
                                product ? "text-gray-400" : ""
                            }`}
                        />
                        <p className="error">
                            Debe ingresar el código de barras a 13 dígitos
                            (número entero2)
                        </p>
                    </div>
                    <SecondaryButton
                        className="mt-11 w-2/5 sm:w-fit"
                        type="button"
                        disabled={product ? true : false}
                        onClick={getGenerateCode}
                    >
                        Generar código
                    </SecondaryButton>
                </div>
                {product && (
                    <div className="form-group">
                        <label>Estado del producto</label>
                        <br />
                        <div className="mt-1 space-x-6">
                            <label>
                                <input
                                    id="active"
                                    type="radio"
                                    value="activo"
                                    checked={
                                        selectedOptionProductState === "activo"
                                    }
                                    onChange={handleProductStateChange}
                                />
                                Activo
                            </label>
                            <label>
                                <input
                                    id="inactive"
                                    type="radio"
                                    value="inactivo"
                                    checked={
                                        selectedOptionProductState ===
                                        "inactivo"
                                    }
                                    onChange={handleProductStateChange}
                                />
                                Inactivo
                            </label>
                        </div>
                    </div>
                )}
                <div className={`form-group ${errors.name ? "invalid" : ""}`}>
                    <label>Nombre del producto</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ej. Leche deslactosada 1L"
                        defaultValue={product ? product.name : ""}
                        {...register("name", {
                            required: true,
                            maxLength: 255,
                        })}
                    />
                    <p className="error">
                        Debe ingresar el nombre del producto
                    </p>
                </div>
                <div
                    className={`form-group ${
                        errors.description ? "invalid" : ""
                    }`}
                >
                    <label>Descripción</label>
                    <textarea
                        id="description"
                        placeholder="Ej. Producto 100% de vaca, obtenida de manera artesanal..."
                        defaultValue={product ? product.description : ""}
                        className={`${
                            errors.description ? "border-red-600" : ""
                        }`}
                        rows={5}
                        {...register("description", {
                            required: true,
                        })}
                    />
                    <p className="error">
                        Debe ingresar la descripción del producto
                    </p>
                </div>
                <div
                    className={`form-group relative ${
                        errors.image ? "invalid" : ""
                    }`}
                >
                    <label>
                        Fotografía del producto (.png, .jpeg, .jpg, .webp)
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: !product,
                            onChange: (e) => handleImageChange(e),
                        })}
                    />
                    {product && (
                        <p>
                            **Seleccione una imágen si desea cambiarla, caso
                            contrario omita este campo
                        </p>
                    )}
                    {errors.image && (
                        <p className="error">Debe seleccionar una imagen</p>
                    )}
                </div>
                <div
                    className={`form-group ${
                        errors.salePrice ? "invalid" : ""
                    }`}
                >
                    <label>Precio de venta</label>

                    <input
                        id="salePrice"
                        type="number"
                        step="any"
                        placeholder="Ej. 74.5"
                        defaultValue={product ? product.salePrice : ""}
                        {...register("salePrice", {
                            required: true,
                        })}
                    />
                    <p className="error">Debe ingresar el precio de venta</p>
                </div>
                <div
                    className={`form-group ${
                        errors.maximumAmount ? "invalid" : ""
                    }`}
                >
                    <label>Cantidad máxima en compra</label>
                    <input
                        id="maximumAmount"
                        type="number"
                        placeholder="Ej. 20"
                        defaultValue={product ? product.maximumAmount : ""}
                        {...register("maximumAmount", {
                            required: true,
                        })}
                    />
                    <p className="error">
                        Debe ingresar la cantidad máxima de compra
                    </p>
                </div>
                <div
                    className={`form-group ${
                        errors.productCategory ? "invalid" : ""
                    }`}
                >
                    <label>Categoría del producto</label>
                    <select
                        id="productCategory"
                        defaultValue={product ? product.idCategory : ""}
                        className={`${
                            errors.productCategory ? "border-red-600" : ""
                        } ${categoryColor}`}
                        {...register("productCategory", {
                            required: true,
                            onChange: (e) => handleCategoryChange(e),
                        })}
                    >
                        <option value="" disabled>
                            Selecciona una categoría de producto
                        </option>
                        {productCategories.value.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                                className="text-gray-800"
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <p className="error">
                        Debe seleccionar una categoría de producto
                    </p>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <h1 className="lg:text-3xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                        Inventario por sucursal
                    </h1>
                    {stores.value.length > 0 && (
                        <ul className="mt-3 w-full grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 bg-gray-300 p-4 border border-slate-500 text-xs sm:text-sm md:text-xs lg:text-lg">
                            <li className="flex justify-center items-center col-span-1 col-start-1">
                                <p className="font-semibold text-gray-800 text-center">
                                    Sucursal
                                </p>
                            </li>
                            <li className="flex justify-center items-center col-span-1 col-start-2">
                                <p className="font-semibold text-gray-800 text-center ">
                                    Caducidad
                                </p>
                            </li>
                            <li className="flex justify-center items-center col-span-1 col-start-3">
                                <p className="font-semibold text-gray-800 text-center">
                                    Cantidad
                                </p>
                            </li>
                        </ul>
                    )}
                    {stores.value.map((store) => (
                        <InventoriesByStore
                            key={store.id}
                            store={store}
                            inventory={
                                inventoriesOnForm.find(
                                    (inventory) =>
                                        inventory.idStore === store.id
                                ) || {}
                            }
                            onInventoryChange={handleInventoryChange}
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-6">
                    <PrimaryButton disabled={isLoadingRegister}>
                        {isLoadingRegister
                            ? product
                                ? "Actualizando..."
                                : "Registrando..."
                            : product
                            ? "Actulizar Producto"
                            : "Registrar producto"}
                    </PrimaryButton>
                </div>
            </form>
        ) : (
            <div className="col-start-1 col-span-4 mt-2">
                <ErrorBanner
                    image={{
                        src: "/illustrations/empty-cart.svg",
                        alt: "Imagen representativa de categorías de productos no cargadas",
                    }}
                    title={"¡Error al cargar las categorías o las tiendas!"}
                    message="Ocurrió un error al cargar las categorías de productos o las tiendas"
                />
            </div>
        )
    ) : (
        <div className="col-start-1 col-span-4 mt-2">
            <p className="text-center mt-36 text-2xl">
                Cargando categorías de productos y tiendas...
            </p>
        </div>
    );
};
