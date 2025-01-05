import { Store } from "@/types/types/model/stores";
import { FC } from "react";
import { StoreForm } from "@/components/forms/StoreForm";

type ModifyStoreCardProps = {
  store: Store;
  onDiscardEditionButtonClick: () => void;
  onStoreUpdate: (store: Store) => void;
};

export const ModifyStoreCard: FC<ModifyStoreCardProps> = ({ store, onDiscardEditionButtonClick, onStoreUpdate }) => {
  return (
    <article className="p-8 rounded-lg border border-gray-300">
      <StoreForm
        initialStoreValue={store}
        onDiscard={onDiscardEditionButtonClick}
        onSubmitComplete={onStoreUpdate}
      />
    </article>
  );
}
