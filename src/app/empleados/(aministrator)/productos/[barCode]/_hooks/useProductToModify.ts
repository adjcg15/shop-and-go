"use client";
import { useParams } from "next/navigation";
import { Product } from "@/types/types/model/products";
import { useCallback, useState, useEffect } from "react";
import shopAndGoAPI from "@/utils/axios";
import { isAxiosError } from "axios";
import { HttpStatusCodes } from "@/types/enums/http";
import { isClientErrorHTTPCode } from "@/utils/http";
import { GetProductErrorCodes } from "@/types/enums/error_codes";

type ProductState = {
    loading: boolean;
    value: Product | null;
    error: string | null;
};

const INITIAL_PRODUCT_STATE = {
    loading: false,
    value: null,
    error: null,
};

export const useProductToModify = () => {
    const { barCode } = useParams();
    const validatedBarCode = Array.isArray(barCode) ? barCode[0] : barCode;
    const [product, setProduct] = useState<ProductState>(INITIAL_PRODUCT_STATE);
    const loadProduct = useCallback(async (barCode: string) => {
        setProduct({
            loading: true,
            value: null,
            error: null,
        });

        let errorMessage =
            "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";

        try {
            const { data } = await shopAndGoAPI.get<Product>(
                `/products/${barCode}`
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
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            if (validatedBarCode) {
                await loadProduct(validatedBarCode);
            }
        };

        getProduct();
    }, [loadProduct, validatedBarCode]);

    return {
        product,
    };
};
