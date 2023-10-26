import React, { useState, ReactElement, useContext } from "react";
import ServerFacade from "../../api/ServerFacade";
import { toast } from "react-toastify";
import { toastEmitter } from "../../sr-ui/Toaster";
import SRButton from "../../sr-ui/SRButton";
import SRFlex from "../../sr-ui/SRFlex";
import SRForm from "../../sr-ui/SRForm";
import SRTextInputList from "../../sr-ui/SRTextInputList";
import SRText from "../../sr-ui/SRText";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatList } from "../../utils/language-utils";
import { Context } from "../../App";
import { FoodCategory, allFoodCategories } from "../../types";
import SRDropDown from "../../sr-ui/SRDropDown";

const AutoAddRecipe = (): ReactElement => {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [category, setCategory] = useState<FoodCategory>();
  const { t } = useTranslation();
  const { language } = useContext(Context);

  const navigate = useNavigate();

  const generateRecipe = async (e): Promise<void> => {
    e.preventDefault();
    toast.info(
      t("Considering possibilities using", {
        ingredients: formatList(ingredients, language),
      }),
      toastEmitter({ autoClose: 15000 })
    );
    ServerFacade.generateRecipe({
      ingredients: ingredients,
      category: category.phrase,
      onSuccess: showSuccess,
      onFailure: showError,
    });
  };

  const showSuccess = ({ recipe }) => {
    toast.dismiss();
    setTimeout(
      () =>
        toast.success(
          `${t("Generated new recipe:")} ${recipe.name}!`,
          toastEmitter({ autoClose: 7000 })
        ),
      50
    );
    navigate("/recipes/" + recipe._id);
  };

  const showError = () => {
    toast.error(
      t(
        "Failed to generate new recipe. Try again. If the error persists, give up."
      ),
      toastEmitter({ autoClose: 10000 })
    );
  };

  return (
    <SRFlex direction="column">
      <SRForm>
        <SRDropDown
          value={category?.displayName}
          onChange={(e) => setCategory(allFoodCategories[e.target.value])}
          label={"Category"}
          listName={"food-category"}
        >
          {Object.entries(allFoodCategories).map(([key, foodCategory]) => (
            <option key={key} value={key}>
              {t(foodCategory.displayName)}
            </option>
          ))}
        </SRDropDown>
        <SRTextInputList
          label={t("Ingredients")}
          values={ingredients}
          setValues={setIngredients}
        />
        <SRFlex justifyContent="center">
          <SRText fontSize="small">
            {t("This will take about 15 seconds")}
          </SRText>
        </SRFlex>
        <SRFlex justifyContent="center">
          <SRButton onClick={generateRecipe}>{t("Generate")}</SRButton>
        </SRFlex>
      </SRForm>
    </SRFlex>
  );
};

export default AutoAddRecipe;
