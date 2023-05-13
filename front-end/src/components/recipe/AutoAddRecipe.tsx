import React, { useState, ReactElement, useContext } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "../../sr-ui/Toaster.tsx";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRForm from "../../sr-ui/SRForm.tsx";
// @ts-ignore
import SRTextInputList from "../../sr-ui/SRTextInputList.tsx";
// @ts-ignore
import SRText from "../../sr-ui/SRText.tsx";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { useTranslation } from "react-i18next";
// @ts-ignore
import { formatList } from "../../utils/language-utils.ts";
// @ts-ignore
import { Context } from "../../App.tsx";

const AutoAddRecipe = (): ReactElement => {
  const [ingredients, setIngredients] = useState<string[]>([""]);
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