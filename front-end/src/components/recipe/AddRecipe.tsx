import React, { useState, useContext, ReactElement } from "react";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import ServerFacade, { AddRecipeParams } from "../../api/ServerFacade.ts";
// import { toast } from "react-toastify";
// // @ts-ignore
// import { toastEmitter } from "../../sr-ui/Toaster.tsx"; // TODO: Use this
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRTextInput from "../../sr-ui/SRTextInput.tsx";
// @ts-ignore
import SRForm from "../../sr-ui/SRForm.tsx";
// @ts-ignore
import { themeGray } from "../../sr-ui/styles.ts";
// @ts-ignore
import { ContextType } from "../../types.ts";

const AddRecipe: React.FC = (): ReactElement => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [numServings, setNumServings] = useState<string>("1");
  const [link, setLink] = useState("");
  const { user } = useContext<ContextType>(Context);

  const addRecipe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const params: AddRecipeParams = {
      userId: user?._id,
      name,
      description,
      ingredients,
      steps,
      numServings,
      link,
    };

    await ServerFacade.addRecipe(params);
    setName("");
    setDescription("");
    setIngredients("");
    setSteps("");
    setNumServings("1");
    setLink("");
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer maxWidth="medium">
        <SRHeader size="large" underlined>
          Add Recipe
        </SRHeader>
        <SRContainer backgroundColor={themeGray} borderWidth="small">
          <SRFlex direction="column">
            <SRForm onSubmit={addRecipe}>
              <SRTextInput
                type="text"
                label="Name:"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></SRTextInput>
              <SRTextInput
                type="number"
                label="Servings:"
                value={numServings}
                onChange={(e) => setNumServings(e.target.value)}
              ></SRTextInput>
              <SRTextInput
                label="Ingredients:"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                textarea
              ></SRTextInput>
              <SRTextInput
                label="Steps:"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                textarea
              ></SRTextInput>
              <SRTextInput
                label="Description:"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                textarea
              ></SRTextInput>
              <SRTextInput
                label="Link:"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              ></SRTextInput>
              <SRFlex justifyContent="center">
                <SRButton type="submit" onClick={addRecipe}>
                  Add to Recipe Book
                </SRButton>
              </SRFlex>
            </SRForm>
          </SRFlex>
        </SRContainer>
      </SRContainer>
    </SRFlex>
  );
};

export default AddRecipe;
