import { Store } from "@/types/types/model/stores";
import { FC, useCallback, useState } from "react";
import { StorePresentationCard } from "./StorePresentationCard";
import { ModifyStoreCard } from "./ModifyStoreCard";

type StoreCardProps = {
  store: Store;
  updateStoreOnList: (store: Store) => void;
};

export const StoreCard:FC<StoreCardProps> = ({ store, updateStoreOnList }) => {
  const [isEditingStore, setIsEditingStore] = useState(false);

  const startStoreEdition = useCallback(() => {
    setIsEditingStore(true);
  }, []);

  const finishStoreEdition = useCallback(() => {
    setIsEditingStore(false);
  }, []);

  const onStoreUpdate = useCallback((store: Store) => {
    finishStoreEdition();
    updateStoreOnList(store);
  }, [finishStoreEdition, updateStoreOnList]);
  
  return (
    !isEditingStore 
    ? <StorePresentationCard store={store} onModifyStoreButtonClick={startStoreEdition}/>
    : <ModifyStoreCard onStoreUpdate={onStoreUpdate} store={store} onDiscardEditionButtonClick={finishStoreEdition}/>
  );
}
