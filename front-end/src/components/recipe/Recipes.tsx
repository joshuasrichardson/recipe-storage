import React from "react";
import { useState, ReactElement } from "react";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
import { Item, Recipe } from "../../types";
// @ts-ignore
import SRGroupDisplay from "../../sr-ui/SRGroupDisplay.tsx";

const Recipes: React.FC = (): ReactElement => {
  // const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [useImageView, setUseImageView] = useState(false);
  // const location = useLocation();

  // useEffect(() => {
  //   const getRecipesFromState = async (): Promise<void> => {
  //     const state = location.state as Item;
  //     if (state) {
  //       if (state.tags.length > 0) {
  //         await ServerFacade.getRecipes(state.tags, setRecipes);
  //       } else if (state.name) {
  //         await ServerFacade.getRecipes(state.name, setRecipes);
  //       }
  //       location.state = null;
  //     }
  //   };
  //   getRecipesFromState();
  // }, [location]);

  // const onSearchChange = async (e: ChangeEvent<HTMLInputElement>): Promise<any> => {
  //   return ServerFacade.getRecipes(e.currentTarget.value.trim(), setRecipes);
  // };

  // const getAllRecipes = async (e: ChangeEvent<HTMLInputElement>): Promise<any> => {
  //   return ServerFacade.getRecipes(e.currentTarget.value.trim(), setRecipes);
  // };

  const getRecipesHTML = (recipes: Recipe[]): JSX.Element[] => {
    return recipes.map((recipe: Recipe, index: number) => (
      <RecipeComponent key={index} recipe={recipe} />
    ));
  };

  const search = async (searchString: string): Promise<Recipe[]> => {
    return ServerFacade.getRecipes(searchString);
  };

  return (
    <SRGroupDisplay
      title={"Recipes"}
      getAllObjects={ServerFacade.getRecipes}
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
  const getRecipeAttributes = (recipe) => {
    return [
      { key: "Servings", value: recipe.numServings },
      { key: "Ingredients", value: recipe.ingredients?.join("\n") },
      { key: "Steps", value: recipe.steps?.join("\n") },
      { key: "Calories", value: recipe.calories },
      { key: "Link", value: recipe.link },
    ];
  };

  return (
    <SRBoxView
      key={recipe._id}
      src={recipe.image}
      label={recipe.label || recipe.name}
      attributes={getRecipeAttributes(recipe)}
    />
  );
};
