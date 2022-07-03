import React from "react";
import ServerFacade from "../api/ServerFacade";
import ItemGroup from "./ItemGroup";

function StorageHistory() {
  return (
    <ItemGroup
      title="Food Storage History"
      getItemGroup={ServerFacade.getStorageHistory}
      itemViewDir="/storage/history/" //TODO: Add a component corresponding to this path
    />
  );
}

export default StorageHistory;
