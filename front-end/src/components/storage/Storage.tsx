import React, { ReactElement } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import ItemGroup from "./ItemGroup.tsx";

const Storage: React.FC = (): ReactElement => {
  return (
    <ItemGroup
      title="Food Storage"
      getItemGroup={ServerFacade.getStorage}
      itemViewDir="/storage/"
      showExpiration
    />
  );
};

export default Storage;
