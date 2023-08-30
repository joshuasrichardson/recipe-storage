import React, { useState, useContext, ReactElement, useEffect } from "react";
import { Context } from "../../App";
import ServerFacade, { AddRecipeParams } from "../../api/ServerFacade";
import SRButton from "../../sr-ui/SRButton";
import SRFlex from "../../sr-ui/SRFlex";
import SRTextInput from "../../sr-ui/SRTextInput";
import SRForm from "../../sr-ui/SRForm";
import { ContextType, Recipe } from "../../types";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { toastEmitter } from "../../sr-ui/Toaster";
import { useNavigate } from "react-router-dom";

interface ManuallyAddRecipeProps {
  recipe?: Recipe;
}

const ManuallyAddRecipe = ({
  recipe,
}: ManuallyAddRecipeProps): ReactElement => {
  const [name, setName] = useState<string>(recipe?.name || "");
  const [minutes, setMinutes] = useState<string>(`${recipe?.minutes || ""}`);
  const [materials, setMaterials] = useState<string>(
    recipe?.materials?.join("\n") || ""
  );
  const [description, setDescription] = useState<string>(
    recipe?.description || ""
  );
  const [ingredients, setIngredients] = useState<string>(
    recipe?.ingredients?.join("\n") || ""
  );
  const [steps, setSteps] = useState<string>(recipe?.steps?.join("\n") || "");
  const [numServings, setNumServings] = useState<string>(
    `${recipe?.numServings || ""}`
  );
  const [link, setLink] = useState(recipe?.link || "");
  const { user, language } = useContext<ContextType>(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setMinutes(`${recipe.minutes || ""}`);
      setMaterials(recipe.materials?.join("\n") || "");
      setDescription(recipe.description || "");
      setIngredients(recipe.ingredients?.join("\n") || "");
      setSteps(recipe.steps?.join("\n") || "");
      setNumServings(`${recipe.numServings || ""}`);
      setLink(recipe.link || "");
    }
  }, [recipe]);

  const showSuccess = ({ recipe, action }) => {
    toast.dismiss();
    setTimeout(
      () =>
        toast.success(
          `${t(`${action} new recipe:`)} ${recipe.name}!`,
          toastEmitter({ autoClose: 7000 })
        ),
      50
    );
    navigate("/recipes/" + recipe._id);
  };

  const showError = ({ action }) => {
    toast.error(
      t(`Failed to ${action} recipe.`),
      toastEmitter({ autoClose: 10000 })
    );
  };

  const addRecipe = async (e): Promise<void> => {
    e.preventDefault();
    const params: AddRecipeParams = {
      userId: user?._id,
      name,
      minutes,
      materials,
      description,
      ingredients,
      steps,
      numServings,
      link,
      language,
    };

    try {
      await ServerFacade.addRecipe(params);
      setName("");
      setMinutes("");
      setMaterials("");
      setDescription("");
      setIngredients("");
      setSteps("");
      setNumServings("1");
      setLink("");
      showSuccess({ recipe, action: "Added" });
    } catch (err) {
      showError({ action: "add new" });
    }
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const updateRecipe = async (e): Promise<void> => {
    e.preventDefault();
    const params: AddRecipeParams = {
      userId: user?._id,
      name,
      minutes,
      materials,
      description,
      ingredients,
      steps,
      numServings,
      link,
      language,
    };

    try {
      await ServerFacade.updateRecipe(recipe._id, params);
      showSuccess({ recipe, action: "Updated" });
    } catch (e) {
      showError({ action: "update" });
    }
  };

  return (
    <SRFlex direction="column">
      <SRForm>
        <SRTextInput
          type="text"
          label={t("Name")}
          value={name}
          placeholder={t("Chocolate Chip Cookies")}
          onChange={(e) => setName(e.target.value)}
        ></SRTextInput>
        <SRTextInput
          type="number"
          label={t("Minutes to Make")}
          value={minutes}
          placeholder="20"
          onChange={(e) => setMinutes(e.target.value)}
        ></SRTextInput>
        <SRTextInput
          type="number"
          label={t("Servings")}
          value={numServings}
          placeholder="12"
          onChange={(e) => setNumServings(e.target.value)}
        ></SRTextInput>
        <SRTextInput
          label={t("Ingredients")}
          value={ingredients}
          placeholder={t("0.5 pounds butter\n1 cup white sugar\n...")}
          onChange={(e) => setIngredients(e.target.value)}
          textarea
        ></SRTextInput>
        <SRTextInput
          label={t("Required Materials")}
          value={materials}
          placeholder={t("measuring cups\nmixing bowl\noven\n...")}
          onChange={(e) => setMaterials(e.target.value)}
          textarea
        ></SRTextInput>
        <SRTextInput
          label={t("Steps")}
          value={steps}
          placeholder={t(
            "1. Mix butter and white sugar in the mixing bowl\n2. ..."
          )}
          onChange={(e) => setSteps(e.target.value)}
          textarea
        ></SRTextInput>
        <SRTextInput
          label={t("Extra Notes")}
          value={description}
          placeholder={t("These cookies won the 'Best Cookies Award' at ...")}
          onChange={(e) => setDescription(e.target.value)}
          textarea
        ></SRTextInput>
        <SRTextInput
          label={t("Link")}
          type="url"
          value={link}
          placeholder="https://www.thefullrecipe.com"
          onChange={(e) => setLink(e.target.value)}
        ></SRTextInput>
        <SRFlex justifyContent="center">
          <SRButton
            onClick={recipe?._id ? updateRecipe : addRecipe}
            type="button"
          >
            {t("Save")}
          </SRButton>
        </SRFlex>
      </SRForm>
    </SRFlex>
  );
};

export default ManuallyAddRecipe;
