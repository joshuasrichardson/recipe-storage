import { useState } from "react";

function ViewRecipes() {
  const [searchField, setSearchField] = useState("");
  const [relevantRecipes, setRelevantRecipes] = useState([]);

  const onSearchChange = (e) => setSearchField(e.target.value);

  const fetchRecipes = async (item) => {
    await fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        item +
        "&app_id=3a833dd2&app_key=688beca46c7ed7483c41a629c1c183a3"
    )
      .then((data) => data.json())
      .then((recipes) => displayRecipes(recipes));
  };

  const displayRecipes = (recipes) => {
    setRelevantRecipes(getRecipesHTML(Array.from(recipes.hits)));
  };

  const getRecipesHTML = (items) => {
    return items.map((item) => <Recipe recipe={item} />);
  };

  return (
    <div className="page">
      <div className="main-container other-container food-storage-container">
        <div className="food-storage-header">
          <h1 className="title">Recipes</h1>
          <input
            id="recipe-search-bar"
            className="search-bar"
            type="search"
            placeholder="Search recipes..."
            onChange={onSearchChange}
          ></input>
        </div>
        <button onClick={() => fetchRecipes(searchField)}>Search</button>
        <div className="storage-item-container">{relevantRecipes}</div>
      </div>
    </div>
  );
}

export default ViewRecipes;

const Recipe = (recipe) => {
  recipe = recipe.recipe.recipe;
  console.log(recipe);
  return (
    <div key={recipe.label} className="storage-item">
      <img
        className="storage-item-picture"
        src={recipe.image}
        alt={recipe.label}
      />
      <h3 className="storage-item-name">{recipe.label}</h3>
      <ul className="storage-item-description">
        <li>Calories: {Math.round(recipe.calories)}</li>
        <li>
          <a href={recipe.url}>See recipe details</a>
        </li>
      </ul>
    </div>
  );
};
