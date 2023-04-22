import React from "react";
import { useState, ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
import { Attribute, Item, Recipe } from "../../types";
// @ts-ignore
import SRGroupDisplay from "../../sr-ui/SRGroupDisplay.tsx";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "../../sr-ui/Toaster.tsx";

const Recipes: React.FC = (): ReactElement => {
  const [useImageView, setUseImageView] = useState(false);
  const location = useLocation();

  const getRecipesHTML = (recipes: Recipe[]): JSX.Element[] => {
    return recipes
      .filter((recipe: Recipe) => recipe.name)
      .map((recipe: Recipe, index: number) => (
        <RecipeComponent key={index} recipe={recipe} />
      ));
  };

  const formatSearchString = (name: string, tags?: string): string => {
    let searchString: string = name + (tags ? ", " + tags : "");
    searchString = searchString.replaceAll(", ", "|");

    // TODO: Add anchors (^...$) after we separate the amount from the ingredient names in the backend.
    return searchString;
  };

  const getRecipes = async (
    setRecipes: (recipes: Recipe[]) => void,
    setSearchString: (searchString: string) => void
  ): Promise<void> => {
    const state = location.state as Item;
    if (state && state.name) {
      let searchString = formatSearchString(state.name, state.tags);
      if (searchString) {
        setSearchString(searchString);
        setRecipes(await ServerFacade.getRecipes(searchString));
      } else setRecipes(await ServerFacade.getRecipes(""));
      location.state = null;
    } else setRecipes(await ServerFacade.getRecipes(""));
  };

  const search = async (searchString: string): Promise<Recipe[]> => {
    return ServerFacade.getRecipes(searchString);
  };

  const AutogenerateIcon = (props) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M4.5 19.5L19.5 4.5"
          stroke="#FFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="11" y="8" width="2" height="8" fill="#FFF" />
        <rect x="8" y="11" width="8" height="2" fill="#FFF" />
        <circle cx="5" cy="5" r="2" fill="#FFF" />
        <circle cx="19" cy="19" r="2" fill="#FFF" />
      </svg>
    );
  };

  const showSuccess = ({ usedIngredients, recipeNames }) => {
    toast.success(
      `Generated new recipes: ${recipeNames.join(",")}!`,
      toastEmitter()
    );
    console.log(`Used ${usedIngredients}`);
  };

  const showError = () => {
    toast.error("Failed to generate new recipe.", toastEmitter());
  };

  const GenerateButton = () => (
    <SRButton
      size="small"
      onClick={() =>
        ServerFacade.generateRecipeWithOldestIngredients({
          onSuccess: showSuccess,
          onFailure: showError,
        })
      }
    >
      <AutogenerateIcon />
    </SRButton>
  );

  return (
    <SRGroupDisplay
      title={"Recipes"}
      initialSearch={getRecipes}
      getObjectsHTML={getRecipesHTML}
      objectType={"Recipe"}
      objectTypePlural={"Recipes"}
      addUrl="/recipes/add"
      GenerateButton={GenerateButton}
      search={search}
      useImageView={useImageView}
      setUseImageView={setUseImageView}
      searchImmediately={false}
    />
  );
};

export default Recipes;

const RecipeComponent = ({ recipe }) => {
  const navigate = useNavigate();

  const getRecipeAttributes = (recipe: Recipe): Attribute[] => {
    return [
      { key: "Servings", value: `${recipe.numServings}` },
      {
        key: "Time",
        value: recipe?.minutes ? recipe?.minutes + " minutes" : undefined,
      },
    ];
  };

  return (
    <SRBoxView
      onClick={() => {
        navigate("/recipes/" + recipe._id);
      }}
      key={recipe._id}
      src={recipe.image}
      label={recipe.name}
      attributes={getRecipeAttributes(recipe)}
    />
  );
};
