import React, { useState, useContext, ReactElement } from "react";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import ServerFacade, { AddRecipeParams } from "../../api/ServerFacade.ts";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "../Toaster.tsx";

const AddRecipe: React.FC = (): ReactElement => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [numServings, setNumServings] = useState<string>("1");
  const [link, setLink] = useState("");
  const { user } = useContext(Context);

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
    <div className="page">
      <div className="main-container other-container">
        <h2>Add Recipe</h2>
        <div className="video-container">
          <div className="user-input">
            <form className="item" onSubmit={addRecipe}>
              <label className="item">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label className="item">Servings:</label>
              <input
                type="number"
                value={numServings}
                onChange={(e) => setNumServings(e.target.value)}
              />
              <label className="item">Ingredients:</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
              <label className="item">Steps:</label>
              <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              ></textarea>
              <label className="item">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label className="item">Link:</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <button className="obvious addButton" type="submit">
                Add to Recipe Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
