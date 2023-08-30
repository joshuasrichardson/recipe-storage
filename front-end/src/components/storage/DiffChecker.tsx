import React, { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import SRButton from "../../sr-ui/SRButton";
import SRBoxView from "../../sr-ui/SRBoxView";
import SRFlex from "../../sr-ui/SRFlex";
import SRContainer from "../../sr-ui/SRContainer";
import SRText from "../../sr-ui/SRText";
import SRHeader from "../../sr-ui/SRHeader";
import { darkTextColor, themeRed } from "../../sr-ui/styles";
import { Attribute } from "../../types.js";
import { useTranslation } from "react-i18next";

type DiffState = {
  id: string;
  oldCode: number;
  oldName: string;
  oldBrand: string;
  oldDescription: string;
  oldTags: string;
  oldAmount: number;
  oldUnit: string;
  newCode: number;
  newName: string;
  newBrand: string;
  newDescription: string;
  newTags: string;
  newAmount: number;
  newUnit: string;
};

const DiffChecker: React.FC = (): ReactElement => {
  const location = useLocation();
  const state = location.state as DiffState;
  const navigate = useNavigate();
  const { innerWidth } = window;
  const { t } = useTranslation();

  const getColor = (attribute) => {
    return JSON.stringify(state["old" + attribute]).trim() ===
      JSON.stringify(state["new" + attribute]).trim()
      ? darkTextColor
      : themeRed;
  };

  const getOldAttributes = (): Attribute[] => {
    return [
      {
        key: t("Code"),
        value: `${state.oldCode}` || " ",
        color: getColor("Code"),
      },
      { key: t("Name"), value: state.oldName || " ", color: getColor("Name") },
      {
        key: t("Brand"),
        value: state.oldBrand || " ",
        color: getColor("Brand"),
      },
      {
        key: t("Description"),
        value: state.oldDescription || " ",
        color: getColor("Description"),
      },
      { key: t("Tags"), value: state.oldTags || " ", color: getColor("Tags") },
      {
        key: t("Amount"),
        value: `${state.oldAmount}` || " ",
        color: getColor("Amount"),
      },
      { key: t("Unit"), value: state.oldUnit || " ", color: getColor("Unit") },
    ];
  };

  const getNewAttributes = (): Attribute[] => {
    return [
      {
        key: t("Code"),
        value: `${state.newCode}` || " ",
        color: getColor("Code"),
      },
      {
        key: t("Name"),
        value: `${state.newName}` || " ",
        color: getColor("Name"),
      },
      {
        key: t("Brand"),
        value: `${state.newBrand}` || " ",
        color: getColor("Brand"),
      },
      {
        key: t("Description"),
        value: state.newDescription || " ",
        color: getColor("Description"),
      },
      { key: t("Tags"), value: state.newTags || " ", color: getColor("Tags") },
      {
        key: t("Amount"),
        value: `${state.newAmount}` || " ",
        color: getColor("Amount"),
      },
      { key: t("Unit"), value: state.newUnit || " ", color: getColor("Unit") },
    ];
  };

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer padding="xlarge" maxWidth="xlarge">
        <SRHeader size="large">{t("Change detected")}</SRHeader>
        <SRText fontSize="large">
          {t("Would you like to update the autofill for this item?")}
        </SRText>
        <SRFlex
          wrap={innerWidth < 600 ? "wrap" : "nowrap"}
          justifyContent="center"
        >
          <SRBoxView
            key="Before"
            label="Before"
            attributes={getOldAttributes()}
          >
            <SRButton onClick={() => navigate("/storage/add")}>
              {t("Keep")}
            </SRButton>
          </SRBoxView>
          <SRBoxView key="After" label="After" attributes={getNewAttributes()}>
            <SRButton
              onClick={() => {
                ServerFacade.updateProduct({
                  id: state.id,
                  code: `${state.newCode}`,
                  name: state.newName,
                  brand: state.newBrand,
                  description: state.newDescription,
                  tags: state.newTags,
                  amount: state.newAmount,
                  unit: state.newUnit,
                });
                navigate("/storage/add");
              }}
            >
              {t("Update")}
            </SRButton>
          </SRBoxView>
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default DiffChecker;
