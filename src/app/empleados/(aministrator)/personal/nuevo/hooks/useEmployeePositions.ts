import { NotificationTypes } from "@/types/enums/notifications";
import { EmployeePosition } from "@/types/types/model/users";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

type PositionsList = {
  loading: boolean;
  value: EmployeePosition[];
  error: null | string;
}

export function useEmployeePositions() {
  const [positionsList, setPositionsList] = useState<PositionsList>({loading: false, value: [], error: null});

  const recoverPositionsList = useCallback(async () => {
    try {
      const { data: stores } =
        await shopAndGoAPI.get<EmployeePosition[]>(
          `/employees/positions`
        );
      setPositionsList({ loading: false, value: stores, error: null });
    } catch(error) {
      let errorMessage = "Estamos teniendo problemas para cargar la lista de cargos, por favor intente más tarde.";

      if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        errorMessage =
          "No fue posible establecer una conexión para cargar " +
          "la lista de cargos. Verifique que su conexión a Internet es estable o intente más tarde.";
      }

      notify({
        title: "Cargos inaccesibles",
        message: errorMessage,
        type: NotificationTypes.ERROR
      });
      setPositionsList({ loading: false, value: [], error: errorMessage });
    }
  }, []);

  return {
    positionsList,
    recoverPositionsList
  }
}