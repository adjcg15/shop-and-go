"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useProductForm } from "../../hooks/useProductForm";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { ONLY_POSITIVE_INTEGERS } from "@/utils/regexp";
import { InventoriesByStore } from "../ui/InventoriesByStore";
import { FC } from "react";
import { FiDollarSign } from "react-icons/fi";

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
                <div className="mt-5 ">
                    <label htmlFor="barCode">Código de barras
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <div
                        className={`form-group mt-0 grid grid-cols-[1fr_auto] gap-x-2 ${
                            errors.barCode ? "invalid" : ""
                        }`}
                    >
                        <input
                            id="barCode"
                            type="text"
                            defaultValue={product ? product.barCode : ""}
                            disabled={product ? true : false}
                            placeholder="Ej. 1234567890123"
                            aria-labelledby="barCodeInput"
                            {...register("barCode", {
                                required: true,
                                maxLength: 13,
                                minLength: 13,
                                pattern: ONLY_POSITIVE_INTEGERS,
                            })}
                            className={`w-max ${
                                product ? "text-gray-400" : ""
                            }`}
                        />
                        <p id="barCodeInput" className="sr-only">
                            Nuevo código de barras del producto
                        </p>
                        <SecondaryButton
                            className="w-min sm:w-fit"
                            type="button"
                            aria-labelledby="generateBarCodeButton"
                            disabled={product ? true : false}
                            onClick={getGenerateCode}
                        >
                            Generar código
                        </SecondaryButton>
                        <p
                            id="generateBarCodeButton"
                            className="sr-only"
                        >
                            Generar un código de barras aleatorio para el producto
                        </p>
                        <p className="error col-span-1">
                            Debe ingresar el código de barras a 13 dígitos
                            (número entero)
                        </p>
                    </div>
                </div>
                {product && (
                    <div className="form-group">
                        <label htmlFor="active">Estado del producto
                            <abbr className="text-orange-600 no-underline" title="Requerido">
                                *
                            </abbr>
                        </label>
                        <br />
                        <div className="mt-1 space-x-6">
                            <label>
                                <input
                                    id="active"
                                    type="radio"
                                    value="activo"
                                    aria-labelledby="activeRadioButton"
                                    checked={
                                        selectedOptionProductState === "activo"
                                    }
                                    onChange={handleProductStateChange}
                                />
                                <p id="activeRadioButton">Desactivar producto</p>
                                Activo
                            </label>
                            <label htmlFor="inactive">
                                <input
                                    id="inactive"
                                    type="radio"
                                    value="inactivo"
                                    aria-labelledby="inactive"
                                    checked={
                                        selectedOptionProductState ===
                                        "inactivo"
                                    }
                                    onChange={handleProductStateChange}
                                />
                                <p id="activeRadioButton">Activar producto</p>
                                Inactivo
                            </label>
                        </div>
                    </div>
                )}
                <div className={`form-group ${errors.name ? "invalid" : ""}`}>
                    <label htmlFor="name">Nombre del producto
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <input
                        id="name"
                        type="text"
                        aria-labelledby="nameInput"
                        placeholder="Ej. Leche deslactosada 1L"
                        defaultValue={product ? product.name : ""}
                        {...register("name", {
                            required: true,
                            maxLength: 255,
                        })}
                    />
                    <p id="nameInput" className="sr-only">
                        Nuevo nombre del producto
                    </p>
                    <p className="error">
                        Debe ingresar el nombre del producto
                    </p>
                </div>
                <div
                    className={`form-group ${
                        errors.description ? "invalid" : ""
                    }`}
                >
                    <label htmlFor="description">Descripción
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <textarea
                        id="description"
                        placeholder="Ej. Producto 100% de vaca, obtenida de manera artesanal..."
                        defaultValue={product ? product.description : ""}
                        className={`${
                            errors.description ? "border-red-600" : ""
                        }`}
                        rows={5}
                        aria-labelledby="descriptionInput"
                        {...register("description", {
                            required: true,
                        })}
                    />
                    <p id="descriptionInput" className="sr-only">
                        Nueva descripción del producto
                    </p>
                    <p className="error">
                        Debe ingresar la descripción del producto
                    </p>
                </div>
                <div
                    className={`form-group relative ${
                        errors.image ? "invalid" : ""
                    }`}
                >
                    <label htmlFor="image">
                        Fotografía del producto (.png, .jpeg, .jpg, .webp) (max.
                        100 kB)
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <input
                        id="image"
                        type="file"
                        aria-labelledby="imageInput"
                        accept="image/*"
                        {...register("image", {
                            required: !product,
                            onChange: (e) => handleImageChange(e),
                        })}
                    />
                    <p id="imageInput" className="sr-only">
                        Nueva fotografía del producto
                    </p>
                    {product && (
                        <p>
                            **Seleccione una imagen si desea cambiarla, caso
                            contrario omita este campo
                        </p>
                    )}
                    {errors.image && (
                        <p className="error">Debe seleccionar una imagen</p>
                    )}
                </div>
                <div className="mt-5">
                    <label htmlFor="salePrice">Precio de venta
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <div
                        className={`mt-0 form-group grid grid-cols-[auto_1fr] ${
                            errors.salePrice ? "invalid" : ""
                        }`}
                    >
                        <FiDollarSign className="mt-0.5 w-max h-full py-1" />
                        <input
                            id="salePrice"
                            type="number"
                            aria-labelledby="salePriceInput"
                            step="any"
                            placeholder="Ej. 74.5"
                            defaultValue={product ? product.salePrice : ""}
                            {...register("salePrice", {
                                required: true,
                            })}
                            className="w-max"
                        />
                        <p id="salePriceInput" className="sr-only">
                            Nuevo precio de venta del producto
                        </p>
                        <p className="error col-start-2 col-span-1">
                            Debe ingresar el precio de venta
                        </p>
                    </div>
                </div>
                <div
                    className={`form-group ${
                        errors.maximumAmount ? "invalid" : ""
                    }`}
                >
                    <label htmlFor="maximumAmount">
                        Cantidad máxima en compra
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <input
                        id="maximumAmount"
                        type="number"
                        aria-labelledby="maximumAmountInput"
                        placeholder="Ej. 20"
                        defaultValue={product ? product.maximumAmount : ""}
                        {...register("maximumAmount", {
                            required: true,
                        })}
                    />
                    <p id="maximumAmountInput" className="sr-only">
                        Nueva cantidad máxima de compra del producto
                    </p>
                    <p className="error">
                        Debe ingresar la cantidad máxima de compra
                    </p>
                </div>
                <div
                    className={`form-group ${
                        errors.productCategory ? "invalid" : ""
                    }`}
                >
                    <label htmlFor="productCategory">
                        Categoría del producto
                        <abbr className="text-orange-600 no-underline" title="Requerido">
                            *
                        </abbr>
                    </label>
                    <select
                        id="productCategory"
                        aria-labelledby="productCategoryInput"
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
                    <p id="productCategoryInput" className="sr-only">
                        Nueva categoría del producto
                    </p>
                    <p className="error">
                        Debe seleccionar una categoría de producto
                    </p>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <h1 className="lg:text-3xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                        Inventario por sucursal
                    </h1>
                    {stores.value.length > 0 && (
                        <>
                            <p className="mt-3">
                                **Solo se guardarán inventarios completos por
                                tienda (en los que se hayan ingresado la fecha
                                de caducidad y cantidad)
                            </p>
                            <ul className="w-full grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 bg-gray-300 p-4 border border-slate-500 text-xs sm:text-sm md:text-xs lg:text-lg">
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
                        </>
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
                            isEdition={product ? true : false}
                            onInventoryChange={handleInventoryChange}
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-6">
                    <PrimaryButton disabled={isLoadingRegister} aria-labelledby="registerProductButton">
                        {isLoadingRegister
                            ? product
                                ? "Actualizando..."
                                : "Registrando..."
                            : product
                            ? "Actualizar Producto"
                            : "Registrar producto"}
                    </PrimaryButton>
                    <p id="registerProductButton" className="sr-only">
                        Guardar información del producto
                    </p>
                </div>
            </form>
        ) : (
            <div className="col-start-1 col-span-4 mt-2">
                <ErrorBanner
                    image={{
                        src: "/illustrations/server-error.svg",
                        alt: "Ilustración representativa de un error en un servidor",
                    }}
                    title={"¡Problemas técnicos!"}
                    message="Estamos teniendo problemas para cargar las categorías y las tiendas, por favor intente más tarde."
                />
            </div>
        )
    ) : (
        <div className="col-start-1 col-span-4 mt-2">
            <p className="text-center mt-36 text-2xl">
                Cargando categorías de productos y tiendas para registrar un
                producto...
            </p>
        </div>
    );
};
