import React, { useState, useContext, ReactElement } from "react";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import ServerFacade, { AddRecipeParams } from "../../api/ServerFacade.ts";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRTextInput from "../../sr-ui/SRTextInput.tsx";
// @ts-ignore
import SRForm from "../../sr-ui/SRForm.tsx";
// @ts-ignore
import { ContextType } from "../../types.ts";
// @ts-ignore
import { useTranslation } from "react-i18next";

const ManuallyAddRecipe = (): ReactElement => {
  const [name, setName] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [materials, setMaterials] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [numServings, setNumServings] = useState<string>("");
  const [link, setLink] = useState("");
  const { user } = useContext<ContextType>(Context);
  const { t } = useTranslation();

  const addRecipe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
    };

    await ServerFacade.addRecipe(params);
    setName("");
    setMinutes("");
    setMaterials("");
    setDescription("");
    setIngredients("");
    setSteps("");
    setNumServings("1");
    setLink("");
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <SRFlex direction="column">
      <SRForm onSubmit={addRecipe}>
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
          placeholder={t(` 0.5 pounds butter
                1 cup white sugar
                ...`)}
          onChange={(e) => setIngredients(e.target.value)}
          textarea
        ></SRTextInput>
        <SRTextInput
          label={t("Required Materials:")}
          value={materials}
          placeholder={t(` measuring cups
                mixing bowl
                oven
                ...`)}
          onChange={(e) => setMaterials(e.target.value)}
          textarea
        ></SRTextInput>
        <SRTextInput
          label={t("Steps:")}
          value={steps}
          placeholder={t(` 1. Mix butter and white sugar in the mixing bowl
                2. ...`)}
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
          label={t("Link:")}
          type="url"
          value={link}
          placeholder={t("https://www.thefullrecipe.com")}
          onChange={(e) => setLink(e.target.value)}
        ></SRTextInput>
        <SRFlex justifyContent="center">
          <SRButton type="submit">{t("Save")}</SRButton>
        </SRFlex>
      </SRForm>
    </SRFlex>
  );
};

export default ManuallyAddRecipe;
