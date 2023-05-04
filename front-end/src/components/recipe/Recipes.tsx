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
import { useTranslation } from "react-i18next";

const Recipes: React.FC = (): ReactElement => {
  const [useImageView, setUseImageView] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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

  return (
    <SRGroupDisplay
      title={t("Recipes")}
      initialSearch={getRecipes}
      getObjectsHTML={getRecipesHTML}
      objectType={t("Recipe")}
      objectTypePlural={t("Recipes")}
      addUrl="/recipes/add"
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
  const { t } = useTranslation();

  const getRecipeAttributes = (recipe: Recipe): Attribute[] => {
    return [
      {
        key: t("Number of people"),
        value: t("servings counter", { count: recipe?.numServings }),
      },
      {
        key: t("Time"),
        value: recipe?.minutes ? recipe?.minutes + t(" minutes") : undefined,
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
