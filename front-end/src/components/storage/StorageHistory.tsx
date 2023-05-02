import React, { ReactElement } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import { formatDateTime } from "../../utils/utils.ts";
// @ts-ignore
import ItemGroup from "./ItemGroup.tsx";
// @ts-ignore
import { useTranslation } from "react-i18next";

const StorageHistory: React.FC = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <ItemGroup
      title={t("Food Storage History")}
      getItemGroup={ServerFacade.getStorageHistory}
      itemViewDir="/storage/history/"
      itemType={t("Action")}
      itemTypePlural={t("Actions")}
      dateFormatter={formatDateTime}
      showExpiration={false}
    />
  );
};

export default StorageHistory;
