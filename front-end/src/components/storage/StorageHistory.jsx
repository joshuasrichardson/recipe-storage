import React from "react";
import ServerFacade from "../../api/ServerFacade";
import ItemGroup from "./ItemGroup";

function StorageHistory() {
  return (
    <ItemGroup
      title="Food Storage History"
      getItemGroup={ServerFacade.getStorageHistory}
      itemViewDir="/storage/history/"
      itemType="Action"
      itemTypePlural="Actions"
    />
  );
}

export default StorageHistory;
