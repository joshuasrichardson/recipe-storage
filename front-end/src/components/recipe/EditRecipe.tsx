import React, { ReactElement, useEffect, useState } from "react";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import { themeGray } from "../../sr-ui/styles.ts";
// @ts-ignore
import ManuallyAddRecipe from "./ManuallyAddRecipe.tsx";
// @ts-ignore
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";

const AddRecipe: React.FC = (): ReactElement => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const initRecipe = async () => {
      setRecipe(await ServerFacade.getRecipe(id));
    };
    initRecipe();
  }, [id]);

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer maxWidth="medium">
        <SRHeader size="large" underlined>
          {t("Edit Recipe")}
        </SRHeader>
        <SRContainer backgroundColor={themeGray} borderWidth="small">
          <ManuallyAddRecipe recipe={recipe} />
        </SRContainer>
      </SRContainer>
    </SRFlex>
  );
};

export default AddRecipe;
