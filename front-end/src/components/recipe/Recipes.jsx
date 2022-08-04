import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade.ts";

function Recipes() {
  const [searchField, setSearchField] = useState("");
  const [relevantRecipes, setRelevantRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getRecipesFromState = async () => {
      if (location.state) {
        if (location.state.tags.length > 0) {
          await ServerFacade.getRecipes(location.state.tags[0], displayRecipes);
        } else if (location.state.name) {
          await ServerFacade.getRecipes(location.state.name, displayRecipes);
        }
        location.state = null;
      }
    };
    getRecipesFromState();
  }, [location]);

  const onSearchChange = (e) => setSearchField(e.target.value);

  const displayRecipes = (recipes) => {
    setRelevantRecipes(getRecipesHTML(recipes));
  };

  const getRecipesHTML = (recipes) => {
    return recipes.map((recipe, index) => (
      <Recipe key={index} recipe={recipe} />
    ));
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
        <button
          className="obvious"
          onClick={() =>
            ServerFacade.getRecipes(searchField.trim(), displayRecipes)
          }
        >
          Search
        </button>
        <div className="storage-item-container">{relevantRecipes}</div>
      </div>
    </div>
  );
}

export default Recipes;

const Recipe = ({ recipe }) => {
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
        <li>Calories: {Math.round(recipe.calories)}</li>
        {recipe.url && (
          <li>
            <a href={recipe.url}>See recipe details</a>
          </li>
        )}
      </ul>
    </div>
  );
};
