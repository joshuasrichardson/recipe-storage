import React, { ReactElement } from "react";
import ServerFacade from "../../api/ServerFacade";
import { formatDateTime } from "../../utils/utils";
import ItemGroup from "./ItemGroup";
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
