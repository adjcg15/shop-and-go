"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useProductForm } from "../_hooks/useProductForm";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { ONLY_POSITIVE_INTEGERS } from "@/utils/regexp";
import { InventoriesByStore } from "./InventoriesByStore";

export const ProductForm = () => {
    const {
        register,
        errors,
        handleSubmit,
        isLoadingRegister,
        handleCategoryChange,
        handleImageChange,
        getGenerateCode,
        productCategories,
        stores,
        categoryColor,
    } = useProductForm();

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
                            placeholder="Ej. 1234567890123"
                            {...register("barCode", {
                                required: true,
                                maxLength: 13,
                                minLength: 13,
                                pattern: ONLY_POSITIVE_INTEGERS,
                            })}
                            className="w-full"
                        />
                        <p className="error">
                            Debe ingresar el código de barras a 13 dígitos
                            (número entero2)
                        </p>
                    </div>
                    <SecondaryButton
                        className="mt-11 w-2/5 sm:w-fit"
                        type="button"
                        onClick={getGenerateCode}
                    >
                        Generar código
                    </SecondaryButton>
                </div>
                <div className={`form-group ${errors.name ? "invalid" : ""}`}>
                    <label>Nombre del producto</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ej. Leche deslactosada 1L"
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
                        id="imageUrl"
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: true,
                            onChange: (e) => handleImageChange(e),
                        })}
                    />
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
                        defaultValue=""
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
                        <InventoriesByStore key={store.id} store={store} />
                    ))}
                </div>
                <div className="flex justify-end mt-6">
                    <PrimaryButton disabled={isLoadingRegister}>
                        {isLoadingRegister
                            ? "Registrando..."
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
