import React, { useState } from "react";
import SRFlex from "../../sr-ui/SRFlex";
import SRHeader from "../../sr-ui/SRHeader";
import { Recipe } from "../../types";
import SRModal from "../../sr-ui/SRModal";
import SRButton from "../../sr-ui/SRButton";
import Recipes from "../recipe/Recipes";
import SRScrollContainer from "../../sr-ui/SRScrollContainer";
import SRBoxView from "../../sr-ui/SRBoxView";
import { t } from "i18next";

interface AddToMealModalProps {
  mealName: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateMealPlan: (mealName: string, recipe: Recipe) => Promise<void>;
  updateMealPlanNameOnly: (
    mealName: string,
    recipeName: string
  ) => Promise<void>;
}

const AddToMealModal: React.FC<AddToMealModalProps> = ({
  mealName,
  isOpen,
  setIsOpen,
  updateMealPlan,
  updateMealPlanNameOnly,
}: AddToMealModalProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const addMeal = async () => {
    if (!searchTerm) return;
    if (selectedRecipe) updateMealPlan(mealName, selectedRecipe);
    else updateMealPlanNameOnly(mealName, searchTerm);
    setIsOpen(false);
  };

  const getAttributes = () => {
    return [
      {
        key: t("Time"),
        value: selectedRecipe?.minutes
          ? selectedRecipe?.minutes + t(" minutes")
          : undefined,
      },
      {
        key: t("Number of people"),
        value: t("servings counter", { count: selectedRecipe?.numServings }),
      },
      { key: t("Materials"), value: selectedRecipe?.materials },
      { key: t("Ingredients"), value: selectedRecipe?.ingredients },
      { key: t("Steps"), value: selectedRecipe?.steps, ol: true },
      { key: t("Description"), value: selectedRecipe?.description },
    ];
  };

  return (
    <SRModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <SRHeader size="medium">Add {mealName} Item</SRHeader>
      <SRFlex direction="column">
        <SRScrollContainer style={{ maxHeight: "60vh" }}>
          {selectedRecipe ? (
            <SRBoxView
              key={selectedRecipe?._id}
              back={() => setSelectedRecipe(undefined)}
              label={selectedRecipe?.name}
              titleSize="small"
              src={selectedRecipe?.imageUrl}
              link={selectedRecipe?.link}
              attributes={getAttributes()}
              maxWidth="xxlarge"
            ></SRBoxView>
          ) : (
            <Recipes
              onClickRecipe={setSelectedRecipe}
              onSearch={setSearchTerm}
            />
          )}
        </SRScrollContainer>
        <SRButton
          disabled={!searchTerm}
          style={{ position: "absolute", bottom: 16 }}
          onClick={addMeal}
        >
          Add
        </SRButton>
      </SRFlex>
    </SRModal>
  );
};

export default AddToMealModal;
