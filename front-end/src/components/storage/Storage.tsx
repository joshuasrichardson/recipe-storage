import React, { ReactElement } from "react";
import ServerFacade from "../../api/ServerFacade";
import ItemGroup from "./ItemGroup";
import { useTranslation } from "react-i18next";
import SRButton from "../../sr-ui/SRButton";
import { themeGreen } from "../../sr-ui/styles";
import useConfirm from "../../hooks/useConfirm";

const Storage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const handleClearAll = () => {
    ServerFacade.clearStorage();
    window.location.reload();
  };

  const confirmClearAll = useConfirm(
    "Are you sure you want to delete every item in your storage?",
    handleClearAll,
    () => null
  );

  return (
    <ItemGroup
      title={t("Food Storage")}
      getItemGroup={ServerFacade.getStorage}
      itemViewDir="/storage/"
      showExpiration
      itemType={t("Item")}
      itemTypePlural={t("Items")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: `1px solid ${themeGreen}`,
          width: "100%",
        }}
      >
        <SRButton variant="secondary" onClick={confirmClearAll}>
          Clear All
        </SRButton>
      </div>
    </ItemGroup>
  );
};

export default Storage;
