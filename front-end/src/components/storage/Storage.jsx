import React from "react";
import ServerFacade from "../../api/ServerFacade.ts";
import ItemGroup from "./ItemGroup";

function Storage() {
  return (
    <ItemGroup
      title="Food Storage"
      getItemGroup={ServerFacade.getStorage}
      itemViewDir="/storage/"
      showExpiration
    />
  );
}

export default Storage;
