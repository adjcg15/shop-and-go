import { Store } from "@/types/types/model/stores";
import { FC, useCallback, useState } from "react";
import { StorePresentationCard } from "./StorePresentationCard";
import { ModifyStoreCard } from "./ModifyStoreCard";

type StoreCardProps = {
  store: Store;
};

export const StoreCard:FC<StoreCardProps> = ({ store }) => {
  const [isEditingStore, setIsEditingStore] = useState(false);

  const startStoreEdition = useCallback(() => {
    setIsEditingStore(true);
  }, []);

  const finishStoreEdition = useCallback(() => {
    setIsEditingStore(false);
  }, []);
  
  return (
    !isEditingStore 
    ? <StorePresentationCard store={store} onModifyStoreButtonClick={startStoreEdition}/>
    : <ModifyStoreCard store={store} onDiscardEditionButtonClick={finishStoreEdition}/>
  );
}
