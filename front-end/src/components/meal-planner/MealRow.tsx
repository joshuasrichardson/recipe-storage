import React, { useState } from "react";
import { ReactElement } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SRHeader from "../../sr-ui/SRHeader";
import { Recipe } from "../../types";
import SRText from "../../sr-ui/SRText";
import SRCheckBox from "../../sr-ui/SRCheckBox";
import SRModal from "../../sr-ui/SRModal";
import MealRecipe from "./MealRecipe";

interface MealRowProps {
  mealName: string;
  meal: Recipe[];
}

const MealRow = ({ mealName, meal }: MealRowProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <SRFlex direction="column" alignItems="flex-start">
      <SRModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Coming soon
      </SRModal>
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
        style={{ marginLeft: 12, marginBottom: 12 }}
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
