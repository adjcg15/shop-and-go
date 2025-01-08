import { useState, useMemo, useCallback, useEffect, useContext } from "react";
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
import { Inventory, Store } from "@/types/types/model/stores";
import { getStore, getStores } from "@/utils/api/stores";
import {
    deleteImageFromCloudinary,
    uploadImageToCloudinary,
} from "@/utils/cloudinary";
import { Product } from "@/types/types/model/products";
import AuthContext from "@/contexts/auth/context";
import UserRoles from "@/types/enums/user_roles";

type PaymentMethodForm = {
    barCode: string;
    name: string;
    description: string;
    image: null;
    salePrice: string | number;
    maximumAmount: string | number;
    productCategory: string | number;
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

type InventoryState = {
    id?: number;
    stock?: number;
    expirationDate?: string;
    idStore: number;
}[];

export function useProductForm(product?: Product, inventories?: Inventory[]) {
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [categoryColor, setCategoryColor] = useState("text-gray-400");
    const [productCategories, setProductCategories] =
        useState<CategoriesListState>(INITIA_GENERAL_LIST_STATE);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [stores, setStores] = useState<StoresListState>(
        INITIA_GENERAL_LIST_STATE
    );
    const [inventoriesOnForm, setInventoriesOnForm] = useState<InventoryState>(
        []
    );
    const [selectedOptionProductState, setSelectedOptionProductState] =
        useState<string>("");
    const { employeeProfile } = useContext(AuthContext);
    const userRole = employeeProfile?.position;
    const idStore = employeeProfile?.idStore;

    const FORM_INITIAL_VALUES = useMemo(
        () => ({
            barCode: product ? product.barCode : "",
            name: product ? product.name : "",
            description: product ? product.description : "",
            image: null,
            salePrice: product ? product.salePrice : "",
            maximumAmount: product ? product.maximumAmount : "",
            productCategory: product ? product.idCategory : "",
        }),
        [product]
    );

    const {
        register,
        handleSubmit: submitWrapper,
        setValue,
        trigger,
        formState: { errors },
    } = useForm({
        defaultValues: FORM_INITIAL_VALUES,
    });

    const router = useRouter();

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
        let errorLoadingStores: string | null = "";
        let storesList: Store[] | null = null;
        if (userRole === UserRoles.ADMINISTRATOR) {
            const dataResult = await getStores();
            errorLoadingStores = dataResult.errorLoadingStores;
            storesList = dataResult.storesList;
        } else if (userRole === UserRoles.SALES_EXECUTIVE) {
            const dataResult = await getStore(idStore!);
            errorLoadingStores = dataResult.errorLoadingStore;
            storesList = dataResult.storeInList;
        }

        if (errorLoadingStores) {
            setStores({
                loading: false,
                value: [],
                error: errorLoadingStores,
            });
        } else if (storesList) {
            setStores({
                loading: false,
                value: storesList,
                error: null,
            });
        }
    }, [idStore, userRole]);

    useEffect(() => {
        if (stores.value.length) {
            const filteredStores = stores.value.filter(
                (store) =>
                    !inventories?.some(
                        (inventory) => inventory.idStore === store.id
                    )
            );

            const existingInventories =
                inventories?.map((inventory) => ({
                    id: inventory.id,
                    idStore: inventory.idStore,
                    stock: inventory.stock,
                    expirationDate: inventory.expirationDate,
                })) || [];

            const combinedInventories = [
                ...existingInventories,
                ...filteredStores.map((store) => ({
                    idStore: store.id,
                })),
            ];

            setInventoriesOnForm(combinedInventories);
        }
    }, [stores.value, inventories]);

    useEffect(() => {
        if (product) {
            setSelectedOptionProductState(
                product.isActive ? "activo" : "inactivo"
            );
            setCategoryColor("text-gray-800");
        }
        loadProductCategories();
        loadStores();
    }, [product, loadProductCategories, loadStores]);

    const onSubmit: SubmitHandler<PaymentMethodForm> = async ({
        barCode,
        name,
        description,
        salePrice,
        maximumAmount,
        productCategory,
    }) => {
        setIsLoadingRegister(true);
        const filteredInventories = inventoriesOnForm.filter(
            (inventory) =>
                inventory.stock !== undefined &&
                inventory.stock >= 0 &&
                inventory.expirationDate !== undefined &&
                inventory.expirationDate.trim() !== ""
        );
        setInventoriesOnForm(filteredInventories);

        barCode = barCode.trim();
        name = name.trim();
        description = description.trim();

        let errorImage;
        let imageUrl;

        if (selectedFile) {
            if (product) {
                const errorDeleteImage = await deleteImageFromCloudinary(
                    product.imageUrl
                );
                if (!errorDeleteImage) {
                    const dataResult = await uploadImageToCloudinary(
                        selectedFile
                    );
                    errorImage = dataResult.errorUploadImage;
                    imageUrl = dataResult.imageUrl;
                }
                errorImage = errorDeleteImage;
            } else {
                const dataResult = await uploadImageToCloudinary(selectedFile);
                errorImage = dataResult.errorUploadImage;
                imageUrl = dataResult.imageUrl;
            }
        } else {
            imageUrl = product?.imageUrl;
        }

        if (errorImage) {
            const notificationInfo: NotificationInfo = {
                title: "Error al cargar la imagen",
                message: errorImage,
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
                isActive: selectedOptionProductState === "activo",
                maximumAmount,
                idCategory: productCategory,
                inventories: filteredInventories,
            };
            try {
                if (product) {
                    await shopAndGoAPI.put(
                        `/products/${product.id}`,
                        requestBody
                    );
                } else {
                    await shopAndGoAPI.post(`/products`, requestBody);
                }
                const notificationInfo: NotificationInfo = {
                    title: product
                        ? "Producto actualizado"
                        : "Producto registrado",
                    message: product
                        ? "El producto ha sido actualizado exitosamente"
                        : "El producto ha sido registrado exitosamente",
                    type: NotificationTypes.SUCCESS,
                };
                notify(notificationInfo);
                setIsLoadingRegister(false);

                router.push(
                    userRole === UserRoles.ADMINISTRATOR
                        ? "/empleados/productos"
                        : "/empleados/productos-en-tienda"
                );
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
                const maxSizeInBytes = 0.1 * 1024 * 1024;
                if (!allowedExtensions.test(file.name)) {
                    const notificationInfo: NotificationInfo = {
                        title: "Error al cargar la imagen",
                        message:
                            "El archivo debe ser un formato de imagen válido",
                        type: NotificationTypes.ERROR,
                    };
                    notify(notificationInfo);
                    e.target.value = "";
                } else if (file.size > maxSizeInBytes) {
                    const notificationInfo: NotificationInfo = {
                        title: "Error al cargar la imagen",
                        message: "El archivo no debe ser mayor a 100 KB",
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

    const handleProductStateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedOptionProductState(event.target.value);
    };

    const handleInventoryChange = (
        idStore: number,
        field: InventoryField,
        value: string | number | undefined
    ) => {
        setInventoriesOnForm((prevInventories) => {
            const updatedInventories = prevInventories.map((inventory) =>
                inventory.idStore === idStore
                    ? { ...inventory, [field]: value }
                    : inventory
            );

            return updatedInventories;
        });
    };

    const getGenerateCode = useCallback(() => {
        const barCodeGenerated = Math.floor(
            10 ** 12 + Math.random() * 9 * 10 ** 12
        ).toString();
        setValue("barCode", barCodeGenerated);
        trigger("barCode");
    }, [setValue, trigger]);

    return {
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
        setValue,
        categoryColor,
    };
}
