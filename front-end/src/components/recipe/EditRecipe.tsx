import React, { ReactElement, useEffect, useState } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import SRHeader from "../../sr-ui/SRHeader";
import SRContainer from "../../sr-ui/SRContainer";
import { themeGray } from "../../sr-ui/styles";
import ManuallyAddRecipe from "./ManuallyAddRecipe";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";

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
