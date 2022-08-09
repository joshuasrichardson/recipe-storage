import React, { ChangeEvent } from "react";
import { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
import { Item, Recipe } from "../../types";

const Recipes: React.FC = (): ReactElement => {
  const [searchField, setSearchField] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const location = useLocation();

  useEffect(() => {
    const getRecipesFromState = async (): Promise<void> => {
      const state = location.state as Item;
      if (state) {
        if (state.tags.length > 0) {
          await ServerFacade.getRecipes(state.tags[0], setRecipes);
        } else if (state.name) {
          await ServerFacade.getRecipes(state.name, setRecipes);
        }
        location.state = null;
      }
    };
    getRecipesFromState();
  }, [location]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchField(e.currentTarget.value);
  };

  return (
    <div className="page">
      <div className="main-container other-container food-storage-container">
        <div className="food-storage-header">
          <h1 className="title">Recipes -- Temporarily Unavailable</h1>
          <input
            id="recipe-search-bar"
            className="search-bar"
            type="search"
            placeholder="Search recipes..."
            onChange={onSearchChange}
          ></input>
        </div>
        <div className="flex-row">
          <Link to="/recipes/add" className="button-link">
            <button className="obvious small">+</button>
          </Link>
        </div>
        <button
          className="obvious"
          onClick={() =>
            ServerFacade.getRecipes(searchField.trim(), setRecipes)
          }
        >
          Search
        </button>
        <div className="storage-item-container">
          {recipes.map((recipe: Recipe, index: number) => (
            <RecipeComponent key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;

const RecipeComponent = ({ recipe }) => {
  console.log(recipe);
  return (
    <div key={recipe.label} className="storage-item">
      {recipe.image && (
        <img
          className="storage-item-picture"
          src={recipe.image}
          alt={recipe.label}
        />
      )}
      <h3 className="storage-item-name">{recipe.label || recipe.name}</h3>
      <ul className="storage-item-description">
        {recipe.numServings && <li>Servings: {recipe.numServings}</li>}
        {recipe.ingredients && (
          <li>Ingredients: {recipe.ingredients.join("\n")}</li>
        )}
        {recipe.steps && <li>Directions: {recipe.steps.join("\n")}</li>}
        {recipe.calories && <li>Calories: {Math.round(recipe.calories)}</li>}
        {recipe.link && (
          <li>
            <a href={recipe.link}>See recipe details</a>
          </li>
        )}
      </ul>
    </div>
  );
};
