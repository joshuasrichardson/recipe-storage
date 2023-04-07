import React, { ReactElement } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import { formatDateTime } from "../../utils/utils.ts";
// @ts-ignore
import ItemGroup from "./ItemGroup.tsx";

const StorageHistory: React.FC = (): ReactElement => {
  return (
    <ItemGroup
      title="Food Storage History"
      getItemGroup={ServerFacade.getStorageHistory}
      itemViewDir="/storage/history/"
      itemType="Action"
      itemTypePlural="Actions"
      dateFormatter={formatDateTime}
      showExpiration={false}
    />
  );
};

export default StorageHistory;
