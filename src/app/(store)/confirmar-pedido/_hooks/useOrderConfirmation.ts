import AuthContext from "@/contexts/auth/context";
import StoreContext from "@/contexts/store/context";
import shopAndGoAPI from "@/utils/axios";
import { NotificationInfo } from "@/types/types/components/notifications";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { HttpStatusCodes } from "@/types/enums/http";
import { NotificationTypes } from "@/types/enums/notifications";
import { isClientErrorHTTPCode } from "@/utils/http";
import { useState, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { CreateOrderErrorCodes } from "@/types/enums/error_codes";

export function useOrderConfirmation() {
    const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState(false);
    const { shoppingCart, nearestStore, deliveryAddress, clearCart } =
        useContext(StoreContext);
    const { clientProfile } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState("");

    const idStore = nearestStore.value?.id;
    const idClient = clientProfile?.id;
    const idPaymentMethod = paymentMethod;
    const idDeliveryAddress = deliveryAddress?.id;
    const products = shoppingCart.map((item) => ({
        idProduct: item.product.id,
        amount: item.totalProducts,
    }));
    const router = useRouter();

    const handleCreateOrderClick = useCallback(async () => {
        setIsLoadingCreateOrder(true);
        const requestBody = {
            idStore,
            idClient,
            idPaymentMethod,
            idDeliveryAddress,
            products,
        };

        try {
            await shopAndGoAPI.post("/orders", requestBody);

            const notificationInfo: NotificationInfo = {
                title: "Pedido realizado con éxito",
                message: "El pedido se ha sido realizado exitosamente",
                type: NotificationTypes.SUCCESS,
            };
            notify(notificationInfo);
            setIsLoadingCreateOrder(false);
            clearCart();
            router.push("/catalogo");
        } catch (error) {
            console.log(error);
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
                if (errorCode === CreateOrderErrorCodes.STOCK_NOT_AVAILABLE) {
                    notificationInfo.title =
                        "El stock actual no satisface el pedido";
                    notificationInfo.message =
                        "No se pudo realizar el pedido debido a que el stock de alguno de los productos no satisface la cantidad solicitada";
                    notificationInfo.type = NotificationTypes.WARNING;
                }
            }

            notify(notificationInfo);
        } finally {
            setIsLoadingCreateOrder(false);
        }

        setIsLoadingCreateOrder(false);
    }, [
        idStore,
        idClient,
        idPaymentMethod,
        idDeliveryAddress,
        products,
        router,
        clearCart,
    ]);

    const handlePaymentMethodChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = e.target.value;
            setPaymentMethod(selectedValue);
        },
        []
    );

    return {
        handleCreateOrderClick,
        handlePaymentMethodChange,
        setPaymentMethod,
        isLoadingCreateOrder,
    };
}
