import React, { useState, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import SRFlex from "../../sr-ui/SRFlex";
import SRBoxView from "../../sr-ui/SRBoxView";
import { Attribute } from "../../types";
import { useTranslation } from "react-i18next";

const MakeRecipe: React.FC = (): ReactElement => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const updateScreen = async () => {
      if (!!recipe) {
        setRecipe(await ServerFacade.getRecipe(id));
      }
    };
    updateScreen();
  }, [id, recipe, setRecipe]);

  const getAttributes = (): Attribute[] => {
    return [
      {
        key: t("Time"),
        value: recipe?.minutes ? recipe?.minutes + t(" minutes") : undefined,
      },
      {
        key: t("Number of people"),
        value: t("servings counter", { count: recipe?.numServings }),
      },
      { key: t("Materials"), value: recipe?.materials },
      { key: t("Ingredients"), value: recipe?.ingredients },
      { key: t("Steps"), value: recipe?.steps, ol: true },
      { key: t("Description"), value: recipe?.description },
    ];
  };

  const getOptions = () => {
    return <SRFlex></SRFlex>;
  };

  return (
    <SRFlex justifyContent="center" padding="large">
      <SRBoxView
        key={recipe?._id}
        label={"Make " + recipe?.name}
        titleSize="large"
        src={recipe?.imageUrl}
        link={recipe?.link}
        attributes={getAttributes()}
        maxWidth="xlarge"
        useCheckBoxes={true}
      >
        {getOptions()}
      </SRBoxView>
    </SRFlex>
  );
};

export default MakeRecipe;
