import React, { useState } from "react";
import { ReactElement } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import { Recipe } from "../../types";
import SRText from "../../sr-ui/SRText";
import SRCheckBox from "../../sr-ui/SRCheckBox";

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
  return (
    <>
      <SRText>{recipe.name}</SRText>
      {recipe.ingredients?.map((ingredient) => (
        <MealRecipeIngredient ingredient={ingredient} />
      ))}
    </>
  );
};

export default MealRecipe;
