"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { NotificationInfo } from "@/types/types/components/notifications";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { HttpStatusCodes } from "@/types/enums/http";
import { NotificationTypes } from "@/types/enums/notifications";
import { isClientErrorHTTPCode } from "@/utils/http";
import shopAndGoAPI from "@/utils/axios";
import { CreateProductErrorCodes } from "@/types/enums/error_codes";
import { CategoriesListState } from "@/types/types/components/products";
import { getProductCategories } from "@/utils/api/products";
import { Store } from "@/types/types/model/stores";
import { getStores } from "@/utils/api/stores";
import { uploadImageToCloudinary } from "@/utils/cloudinary";

type PaymentMethodForm = {
    barCode: string;
    name: string;
    description: string;
    image: File | null;
    salePrice: string;
    maximumAmount: string;
    productCategory: string;
};

const INITIA_GENERAL_LIST_STATE = {
    loading: false,
    value: [],
    error: null,
};

type InventoryField = "stock" | "expirationDate";

type StoresListState = {
    loading: boolean;
    value: Store[];
    error: null | string;
};

export function useProductForm() {
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [categoryColor, setCategoryColor] = useState("text-gray-400");
    const [productCategories, setProductCategories] =
        useState<CategoriesListState>(INITIA_GENERAL_LIST_STATE);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [stores, setStores] = useState<StoresListState>(
        INITIA_GENERAL_LIST_STATE
    );
    const [inventories, setInventories] = useState(() => {
        return stores.value.length
            ? stores.value.map((store) => ({
                  idStore: store.id,
                  stock: "",
                  expirationDate: "",
              }))
            : [];
    });

    const FORM_INITIAL_VALUES = useMemo(
        () => ({
            barCode: "",
            name: "",
            description: "",
            image: null,
            salePrice: "",
            maximumAmount: "",
            productCategory: "",
        }),
        []
    );

    const {
        register,
        handleSubmit: submitWrapper,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: FORM_INITIAL_VALUES,
    });

    const router = useRouter();

    const handleInventoryChange = (
        storeId: number,
        field: InventoryField,
        value: string | number
    ) => {
        setInventories((prev) =>
            prev.map((inventory) =>
                inventory.idStore === storeId
                    ? { ...inventory, [field]: value }
                    : inventory
            )
        );
    };

    const loadProductCategories = useCallback(async () => {
        setProductCategories(() => ({
            loading: true,
            value: [],
            error: null,
        }));
        const { errorLoadingCategories, productCategories } =
            await getProductCategories();
        const productCategoriesList = productCategories
            .filter((category) => category.isActive)
            .map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                };
            });

        if (errorLoadingCategories) {
            setProductCategories({
                loading: false,
                value: [],
                error: errorLoadingCategories,
            });
        } else {
            setProductCategories({
                loading: false,
                value: productCategoriesList,
                error: null,
            });
        }
    }, []);

    const loadStores = useCallback(async () => {
        setStores(() => ({
            loading: true,
            value: [],
            error: null,
        }));
        const { errorLoadingStores, storesList } = await getStores();

        if (errorLoadingStores) {
            setStores({
                loading: false,
                value: [],
                error: errorLoadingStores,
            });
        } else {
            setStores({
                loading: false,
                value: storesList,
                error: null,
            });
        }
    }, []);

    useEffect(() => {
        if (stores.value.length) {
            setInventories(
                stores.value.map((store) => ({
                    idStore: store.id,
                    stock: "",
                    expirationDate: "",
                }))
            );
        }
    }, [stores.value]);

    useEffect(() => {
        loadProductCategories();
        loadStores();
    }, [loadProductCategories, loadStores]);

    const onSubmit: SubmitHandler<PaymentMethodForm> = async ({
        barCode,
        name,
        description,
        salePrice,
        maximumAmount,
        productCategory,
    }) => {
        setIsLoadingRegister(true);
        barCode = barCode.trim();
        name = name.trim();
        description = description.trim();
        salePrice = salePrice.trim();
        maximumAmount = maximumAmount.trim();

        const { errorUploadImage, imageUrl } = await uploadImageToCloudinary(
            selectedFile!
        );

        if (errorUploadImage) {
            const notificationInfo: NotificationInfo = {
                title: "Error al cargar la imagen",
                message: errorUploadImage,
                type: NotificationTypes.ERROR,
            };
            notify(notificationInfo);

            setIsLoadingRegister(false);
        } else {
            const requestBody = {
                barCode,
                name,
                description,
                imageUrl,
                salePrice,
                maximumAmount,
                idCategory: productCategory,
                inventories,
            };
            try {
                await shopAndGoAPI.post(`/products`, requestBody);
                const notificationInfo: NotificationInfo = {
                    title: "Producto registrado",
                    message: "El producto ha sido registrado exitosamente",
                    type: NotificationTypes.SUCCESS,
                };
                notify(notificationInfo);
                setIsLoadingRegister(false);

                router.push("/empleados/productos");
            } catch (error) {
                const notificationInfo: NotificationInfo = {
                    title: "Servicio no disponible",
                    message:
                        "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
                    type: NotificationTypes.ERROR,
                };

                if (
                    isAxiosError(error) &&
                    isClientErrorHTTPCode(Number(error.response?.status)) &&
                    error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
                ) {
                    const errorCode = error.response?.data?.errorCode;
                    if (
                        errorCode ===
                        CreateProductErrorCodes.BAR_CODE_ALREADY_EXISTS
                    ) {
                        notificationInfo.title = "Código de barras existente";
                        notificationInfo.message =
                            "Genere o ingrese otro código de barras, el anterior ya está en uso";
                        notificationInfo.type = NotificationTypes.WARNING;
                    } else if (
                        errorCode ===
                        CreateProductErrorCodes.PRODUCT_CATEGORY_NOT_FOUND
                    ) {
                        notificationInfo.title = "Categoría no encontrada";
                        notificationInfo.message =
                            "La categoría seleccionada no existe actualmente en el sistema";
                        notificationInfo.type = NotificationTypes.WARNING;
                    }
                }

                notify(notificationInfo);
            } finally {
                setIsLoadingRegister(false);
            }
        }
    };

    const handleSubmit = submitWrapper(onSubmit);

    const handleCategoryChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = e.target.value;
            setValue("productCategory", selectedValue);
            setCategoryColor(selectedValue ? "text-gray-800" : "text-gray-400");
        },
        [setValue]
    );

    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const allowedExtensions = /\.(jpg|jpeg|png|webp)$/i;
                if (!allowedExtensions.test(file.name)) {
                    const notificationInfo: NotificationInfo = {
                        title: "Error al cargar la imagen",
                        message:
                            "El archivo debe ser un formato de imagen válido",
                        type: NotificationTypes.ERROR,
                    };
                    notify(notificationInfo);
                    e.target.value = "";
                } else {
                    setSelectedFile(file);
                }
            }
        },
        []
    );

    const getGenerateCode = useCallback(() => {
        const barCodeGenerated = Math.floor(
            10 ** 12 + Math.random() * 9 * 10 ** 12
        ).toString();
        setValue("barCode", barCodeGenerated);
    }, [setValue]);

    return {
        register,
        errors,
        handleSubmit,
        isLoadingRegister,
        handleCategoryChange,
        handleImageChange,
        getGenerateCode,
        productCategories,
        inventories,
        handleInventoryChange,
        stores,
        setValue,
        categoryColor,
    };
}
