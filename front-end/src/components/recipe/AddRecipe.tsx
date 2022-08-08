import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  ReactElement,
} from "react";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import Scanner from "./BarcodeScanner.jsx";
// // When I decide to bring pictures back in, use this:
// import Uploader from "./Uploader.jsx";
// <Uploader setImage={setImage}></Uploader>
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "../Toaster.tsx";

const AddRecipe: React.FC = (): ReactElement => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [numServings, setNumServings] = useState("1");
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const addRecipe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await ServerFacade.addRecipe(user._id);
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
              <label className="item">Item Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <label className="item">Ingredients:</label>
              <input
                type="text"
                value={ingredients[0]}
                onChange={(e) => setIngredients([e.target.value])}
              ></input>
              <label className="item">Steps:</label>
              <input
                type="text"
                value={steps[0]}
                onChange={(e) => setSteps([e.target.value])}
              ></input>
              <label className="item">Number of Servings:</label>
              <input
                type="text"
                value={numServings}
                onChange={(e) => setNumServings(e.target.value)}
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
