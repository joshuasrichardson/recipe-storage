import React, { ReactElement } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import { formatDateTime } from "../../utils/dateUtils.ts";
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
    />
  );
};

export default StorageHistory;
