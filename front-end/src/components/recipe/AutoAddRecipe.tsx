import React, { useState, ReactElement } from "react";
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

const AutoAddRecipe = (): ReactElement => {
  const [ingredients, setIngredients] = useState<string[]>([""]);

  const navigate = useNavigate();

  const toEnglishList = (codeList: string[]): string => {
    if (codeList?.length === 0) return "nothing";
    if (codeList.length === 1) return codeList[0];
    if (codeList.length === 2) return `${codeList[0]} and ${codeList[1]}`;
    return `${codeList.slice(0, codeList.length - 1).join(", ")}, and ${
      codeList[codeList.length - 1]
    }`;
  };

  const generateRecipe = async (e): Promise<void> => {
    e.preventDefault();
    toast.info(
      `Considering possibilities using ${toEnglishList(ingredients)}...`,
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
          `Generated new recipe: ${recipe.name}!`,
          toastEmitter({ autoClose: 7000 })
        ),
      50
    );
    navigate("/recipes/" + recipe._id);
  };

  const showError = () => {
    toast.error(
      "Failed to generate new recipe. Try again. If the error persists, give up.",
      toastEmitter({ autoClose: 10000 })
    );
  };

  return (
    <SRFlex direction="column">
      <SRForm>
        <SRTextInputList
          label="Ingredients:"
          values={ingredients}
          setValues={setIngredients}
        />
        <SRFlex justifyContent="center">
          <SRText fontSize="small">This will take about 15 seconds</SRText>
        </SRFlex>
        <SRFlex justifyContent="center">
          <SRButton onClick={generateRecipe}>Generate</SRButton>
        </SRFlex>
      </SRForm>
    </SRFlex>
  );
};

export default AutoAddRecipe;
