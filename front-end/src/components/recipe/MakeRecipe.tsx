import React, { useState, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
import { Attribute } from "../../types.js";

const MakeRecipe: React.FC = (): ReactElement => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const updateScreen = async () => {
      if (recipe == null) {
        setRecipe(await ServerFacade.getRecipe(id));
      }
    };
    updateScreen();
  }, [id, recipe, setRecipe]);

  const getAttributes = (): Attribute[] => {
    return [
      {
        key: "Time",
        value: recipe?.minutes ? recipe?.minutes + " minutes" : undefined,
      },
      { key: "Servings", value: recipe?.numServings },
      { key: "Materials", value: recipe?.materials },
      { key: "Ingredients", value: recipe?.ingredients },
      { key: "Steps", value: recipe?.steps, ol: true },
      { key: "Description", value: recipe?.description },
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
