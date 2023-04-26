import React, { useState, ReactElement } from "react";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import { themeGray } from "../../sr-ui/styles.ts";
// @ts-ignore
import SRButtonGroup from "../../sr-ui/SRButtonGroup.tsx";
// @ts-ignore
import ManuallyAddRecipe from "./ManuallyAddRecipe.tsx";
// @ts-ignore
import AutoAddRecipe from "./AutoAddRecipe.tsx";

const AddRecipe: React.FC = (): ReactElement => {
  const [shouldAutogenerate, setShouldAutogenerate] = useState<boolean>(true);

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer maxWidth="medium">
        <SRHeader size="large" underlined>
          Add Recipe
        </SRHeader>
        <SRContainer backgroundColor={themeGray} borderWidth="small">
          <SRButtonGroup
            size="medium"
            buttonsProps={[
              {
                label: "Auto",
                variant: shouldAutogenerate ? "primary" : "secondary",
                onClick: () => setShouldAutogenerate(true),
              },
              {
                label: "Manual",
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
