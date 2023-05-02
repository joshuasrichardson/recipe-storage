import React, { ReactElement } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import ItemGroup from "./ItemGroup.tsx";
// @ts-ignore
import { useTranslation } from "react-i18next";

const Storage: React.FC = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <ItemGroup
      title={t("Food Storage")}
      getItemGroup={ServerFacade.getStorage}
      itemViewDir="/storage/"
      showExpiration
      itemType={t("Item")}
      itemTypePlural={t("Items")}
    />
  );
};

export default Storage;
