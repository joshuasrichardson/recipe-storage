import React, { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRText from "../../sr-ui/SRText.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import { darkTextColor, themeRed } from "../../sr-ui/styles.ts";

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

  const getColor = (attribute) => {
    return JSON.stringify(state["old" + attribute]).trim() ===
      JSON.stringify(state["new" + attribute]).trim()
      ? darkTextColor
      : themeRed;
  };

  const getOldAttributes = () => {
    return [
      { key: "Code", value: state.oldCode || " ", color: getColor("Code") },
      { key: "Name", value: state.oldName || " ", color: getColor("Name") },
      { key: "Brand", value: state.oldBrand || " ", color: getColor("Brand") },
      {
        key: "Description",
        value: state.oldDescription || " ",
        color: getColor("Description"),
      },
      { key: "Tags", value: state.oldTags || " ", color: getColor("Tags") },
      {
        key: "Amount",
        value: state.oldAmount || " ",
        color: getColor("Amount"),
      },
      { key: "Unit", value: state.oldUnit || " ", color: getColor("Unit") },
    ];
  };

  const getNewAttributes = () => {
    return [
      { key: "Code", value: state.newCode || " ", color: getColor("Code") },
      { key: "Name", value: state.newName || " ", color: getColor("Name") },
      { key: "Brand", value: state.newBrand || " ", color: getColor("Brand") },
      {
        key: "Description",
        value: state.newDescription || " ",
        color: getColor("Description"),
      },
      { key: "Tags", value: state.newTags || " ", color: getColor("Tags") },
      {
        key: "Amount",
        value: state.newAmount || " ",
        color: getColor("Amount"),
      },
      { key: "Unit", value: state.newUnit || " ", color: getColor("Unit") },
    ];
  };

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer padding="xlarge" maxWidth="xlarge">
        <SRHeader size="large">Change detected</SRHeader>
        <SRText fontSize="large">
          Would you like to update the autofill for this item?
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
            <SRButton onClick={() => navigate("/storage/add")}>Keep</SRButton>
          </SRBoxView>
          <SRBoxView key="After" label="After" attributes={getNewAttributes()}>
            <SRButton
              onClick={() => {
                ServerFacade.updateProduct({
                  id: state.id,
                  code: state.newCode,
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
              Update
            </SRButton>
          </SRBoxView>
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default DiffChecker;
