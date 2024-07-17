import React, { useContext } from "react";
import { useState, ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import SRBoxView from "../../sr-ui/SRBoxView";
import { Attribute, Item, Recipe } from "../../types";
import SRGroupDisplay from "../../sr-ui/SRGroupDisplay";
import { useTranslation } from "react-i18next";
import SRListView from "../../sr-ui/SRListView";
import { themeGreen } from "../../sr-ui/styles";
import { Context } from "../../App";

interface RecipesProps {
  onClickRecipe?: (recipe: Recipe) => void;
  onSearch?: (searchString: string) => void;
}

const Recipes: React.FC<RecipesProps> = ({ onClickRecipe, onSearch }) => {
  const [useImageView, setUseImageView] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { language } = useContext(Context);

  const getRecipesHTML = (recipes: Recipe[]): JSX.Element[] => {
    return recipes
      .filter((recipe: Recipe) => recipe.name)
      .map((recipe: Recipe, index: number) => (
        <RecipeComponent
          key={index}
          recipe={recipe}
          useImageView={useImageView}
          onClickRecipe={onClickRecipe}
        />
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
        setRecipes(await ServerFacade.getRecipes(searchString, language));
      } else setRecipes(await ServerFacade.getRecipes("", language));
      location.state = null;
    } else setRecipes(await ServerFacade.getRecipes("", language));
  };

  const search = async (searchString: string): Promise<Recipe[]> => {
    if (onSearch) onSearch(searchString);
    return ServerFacade.getRecipes(searchString, language);
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
      searchImmediately={true}
    />
  );
};

export default Recipes;

interface RecipeComponentProps {
  recipe: Recipe;
  useImageView: boolean;
  onClickRecipe?: (recipe: Recipe) => void;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({
  recipe,
  useImageView,
  onClickRecipe,
}) => {
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

  if (useImageView) {
    return (
      <SRBoxView
        onClick={() => {
          if (onClickRecipe) onClickRecipe(recipe);
          else navigate("/recipes/" + recipe._id);
        }}
        key={recipe._id}
        src={recipe.image}
        label={recipe.name}
        attributes={getRecipeAttributes(recipe)}
      />
    );
  }

  return (
    <SRListView
      name={recipe.name}
      nameColor={themeGreen}
      rightAlignedInfo={
        recipe.minutes ? `${recipe.minutes}${t(" minutes")}` : ""
      }
      onClick={() => {
        if (onClickRecipe) onClickRecipe(recipe);
        else navigate("/recipes/" + recipe._id);
      }}
    />
  );
};
