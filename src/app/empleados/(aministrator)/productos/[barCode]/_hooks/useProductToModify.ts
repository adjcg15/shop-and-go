"use client";
import { useParams } from "next/navigation";
import { Product } from "@/types/types/model/products";
import { useCallback, useState, useEffect } from "react";
import shopAndGoAPI from "@/utils/axios";
import { isAxiosError } from "axios";
import { HttpStatusCodes } from "@/types/enums/http";
import { isClientErrorHTTPCode } from "@/utils/http";
import { GetProductErrorCodes } from "@/types/enums/error_codes";
import { Inventory } from "@/types/types/model/stores";
import { InventoriesResponse } from "@/types/types/api/inventories";

type ProductState = {
    loading: boolean;
    value: Product | null;
    error: string | null;
};

type InventoriesState = {
    loading: boolean;
    value: Inventory[];
    error: string | null;
};

const INITIA_PRODUCT_STATE = {
    loading: false,
    value: null,
    error: null,
};

const INITIA_INVENTORIES_STATE = {
    loading: false,
    value: [],
    error: null,
};

export const useProductToModify = () => {
    const { barCode } = useParams();
    const validatedBarCode = Array.isArray(barCode) ? barCode[0] : barCode;
    const [product, setProduct] = useState<ProductState>(INITIA_PRODUCT_STATE);
    const [inventories, setInventories] = useState<InventoriesState>(
        INITIA_INVENTORIES_STATE
    );

    const loadProduct = useCallback(async () => {
        setProduct({
            loading: true,
            value: null,
            error: null,
        });

        let errorMessage =
            "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";

        try {
            const { data } = await shopAndGoAPI.get<Product>(
                `/products/${validatedBarCode}`
            );
            setProduct(() => ({
                loading: false,
                value: data,
                error: null,
            }));
        } catch (error) {
            if (
                isAxiosError(error) &&
                isClientErrorHTTPCode(Number(error.response?.status)) &&
                error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
            ) {
                const errorCode = error.response?.data?.errorCode;
                if (errorCode === GetProductErrorCodes.PRODUCT_NOT_FOUND) {
                    errorMessage =
                        "No se encontró el producto con el código de barras especificado";
                }
            }
            setProduct(() => ({
                loading: false,
                value: null,
                error: errorMessage,
            }));
        }
    }, [validatedBarCode]);

    const loadInventories = useCallback(async (idProduct: number) => {
        setInventories({
            loading: true,
            value: [],
            error: null,
        });

        let errorMessage =
            "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";

        try {
            const { data } = await shopAndGoAPI.get<InventoriesResponse>(
                `/products/${idProduct}/inventories`
            );
            setInventories(() => ({
                loading: false,
                value: data,
                error: null,
            }));
        } catch (error) {
            if (
                isAxiosError(error) &&
                isClientErrorHTTPCode(Number(error.response?.status)) &&
                error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
            ) {
                errorMessage =
                    "No se encontró el producto, por lo que no se pudieron recuperar los inventarios";
            }
            setInventories(() => ({
                loading: false,
                value: [],
                error: errorMessage,
            }));
        }
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            if (validatedBarCode) {
                await loadProduct();
            }
        };

        getProduct();
    }, [loadProduct, validatedBarCode]);

    useEffect(() => {
        const getInventories = async () => {
            await loadInventories(product.value!.id);
        };

        if (product.value) {
            getInventories();
        }
    }, [product, loadInventories]);

    return {
        product,
        inventories,
    };
};
