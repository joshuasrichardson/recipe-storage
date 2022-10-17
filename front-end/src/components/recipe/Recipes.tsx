import React from "react";
import { useState, ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
import { Item, Recipe } from "../../types";
// @ts-ignore
import SRGroupDisplay from "../../sr-ui/SRGroupDisplay.tsx";

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

  const formatSearchString = (name: string, tags: string): string => {
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
    if (state) {
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

  return (
    <SRGroupDisplay
      title={"Recipes"}
      initialSearch={getRecipes}
      getObjectsHTML={getRecipesHTML}
      objectType={"Recipe"}
      objectTypePlural={"Recipes"}
      addUrl="/recipes/add"
      search={search}
      useImageView={useImageView}
      setUseImageView={setUseImageView}
    />
  );
};

export default Recipes;

const RecipeComponent = ({ recipe }) => {
  const navigate = useNavigate();

  const getRecipeAttributes = (recipe: Recipe) => {
    return [
      { key: "Servings", value: recipe.numServings },
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
