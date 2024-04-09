import React, { useState } from "react";
import { ReactElement } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import { Recipe } from "../../types";
import SRText from "../../sr-ui/SRText";
import SRCheckBox from "../../sr-ui/SRCheckBox";
import SRButton from "../../sr-ui/SRButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { themeGreen } from "../../sr-ui/styles";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface MealRecipeIngredientProps {
  ingredient: string;
}

const MealRecipeIngredient = ({ ingredient }: MealRecipeIngredientProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SRFlex
      justifyContent="flex-start"
      style={{ marginLeft: 12, marginTop: 12, gap: 8 }}
    >
      <SRCheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      <SRText key={ingredient}>{ingredient}</SRText>
    </SRFlex>
  );
};

interface MealRecipeProps {
  recipe: Recipe;
}

const MealRecipe = ({ recipe }: MealRecipeProps): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div style={{ marginLeft: 4, width: "85%" }}>
      <SRButton
        variant="tertiary"
        onClick={toggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SRText style={{ textAlign: "left" }} fontSize="large">
          {recipe.name}
        </SRText>
        <FontAwesomeIcon
          icon={isExpanded ? solid("caret-up") : solid("caret-down")}
          style={{
            color: themeGreen,
            padding: 8,
          }}
        />
      </SRButton>
      {isExpanded &&
        recipe.ingredients?.map((ingredient) => (
          <MealRecipeIngredient key={ingredient} ingredient={ingredient} />
        ))}
    </div>
  );
};

export default MealRecipe;
