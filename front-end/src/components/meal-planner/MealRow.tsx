import React, { useState } from "react";
import { ReactElement } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SRHeader from "../../sr-ui/SRHeader";
import { Recipe } from "../../types";
import MealRecipe from "./MealRecipe";
import AddMealModal from "./AddToMealModal";

interface MealRowProps {
  mealName: string;
  meal: Recipe[];
  updateMealPlan: (mealName: string, recipe: Recipe) => Promise<void>;
  updateMealPlanNameOnly: (
    mealName: string,
    recipeName: string
  ) => Promise<void>;
}

const MealRow = ({
  mealName,
  meal,
  updateMealPlan,
  updateMealPlanNameOnly,
}: MealRowProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <SRFlex direction="column" alignItems="flex-start">
      <AddMealModal
        updateMealPlan={updateMealPlan}
        updateMealPlanNameOnly={updateMealPlanNameOnly}
        mealName={mealName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <SRFlex direction="row">
        <SRHeader padding="small" size="small">
          {mealName}
        </SRHeader>
        <FontAwesomeIcon
          onClick={openModal}
          icon={solid("plus")}
          style={{ paddingRight: 4 }}
        />
      </SRFlex>
      <SRFlex
        alignItems="flex-start"
        direction="column"
        style={{ marginLeft: 12, marginBottom: 12, gap: 16 }}
      >
        {meal?.map((recipe, index) => (
          <MealRecipe
            key={`${recipe._id}-${recipe.name}-${index}`}
            recipe={recipe}
          />
        ))}
      </SRFlex>
    </SRFlex>
  );
};

export default MealRow;
