import React from "react";
import { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
import { Recipe } from "../../types";
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
    return recipes
      .filter((recipe: Recipe) => recipe.name)
      .map((recipe: Recipe, index: number) => (
        <RecipeComponent key={index} recipe={recipe} />
      ));
  };

  const getRecipes = async (
    setRecipes: (recipes: Recipe[]) => void
  ): Promise<void> => {
    setRecipes(await ServerFacade.getRecipes(""));
  };

  const search = async (searchString: string): Promise<Recipe[]> => {
    return ServerFacade.getRecipes(searchString);
  };

  return (
    <SRGroupDisplay
      title={"Recipes"}
      getAllObjects={getRecipes}
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
