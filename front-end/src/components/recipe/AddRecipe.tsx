import React, { useState, ReactElement } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import SRHeader from "../../sr-ui/SRHeader";
import SRContainer from "../../sr-ui/SRContainer";
import { themeGray } from "../../sr-ui/styles";
import SRButtonGroup from "../../sr-ui/SRButtonGroup";
import ManuallyAddRecipe from "./ManuallyAddRecipe";
import AutoAddRecipe from "./AutoAddRecipe";
import { useTranslation } from "react-i18next";

const AddRecipe: React.FC = (): ReactElement => {
  const [shouldAutogenerate, setShouldAutogenerate] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer maxWidth="medium">
        <SRHeader size="large" underlined>
          {t("Add Recipe")}
        </SRHeader>
        <SRContainer backgroundColor={themeGray} borderWidth="small">
          <SRButtonGroup
            size="medium"
            buttonsProps={[
              {
                label: t("Auto"),
                variant: shouldAutogenerate ? "primary" : "secondary",
                onClick: () => setShouldAutogenerate(true),
              },
              {
                label: t("Manual"),
                variant: shouldAutogenerate ? "secondary" : "primary",
                onClick: () => setShouldAutogenerate(false),
              },
            ]}
            label=""
          />
          {shouldAutogenerate ? <AutoAddRecipe /> : <ManuallyAddRecipe />}
        </SRContainer>
      </SRContainer>
    </SRFlex>
  );
};

export default AddRecipe;
