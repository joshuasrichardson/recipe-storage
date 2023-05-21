import Recipe from "../models/recipes";
import { queryRecipes } from "../helpers/openai";
import { translate } from "../helpers/translation";

export const translateRecipe = async (recipe) => {
  try {
    const translatedName = await translate(recipe.name);
    const translatedMaterials = await Promise.all(
      recipe.materials.map(async (material) => await translate(material))
    );
    const translatedIngredients = await Promise.all(
      recipe.ingredients.map(async (ingredient) => await translate(ingredient))
    );
    const translatedSteps = await Promise.all(
      recipe.steps.map(async (step) => await translate(step))
    );
    const translatedDescription = await translate(recipe.description);

    const translatedRecipe = new Recipe({
      ...recipe,
      name: translatedName,
      materials: translatedMaterials,
      ingredients: translatedIngredients,
      steps: translatedSteps,
      description: translatedDescription,
      language: "ja",
    });

    translatedRecipe.save();
    return translatedRecipe;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const generateRecipe = async (ingredients, user) => {
  const recipeQueryResult = await queryRecipes(ingredients);
  const generatedRecipe = {
    ...recipeQueryResult,
    user,
    wasAutogenerated: true,
    generatedWith: ingredients,
  };

  const translatedRecipePromise = translateRecipe(generatedRecipe);

  const recipe = new Recipe(generatedRecipe);

  recipe.save();

  return user.language !== "ja" ? recipe : await translatedRecipePromise;
};

export const addRecipe = async (recipe, language: "en" | "ja") => {
  if (language === "en") translateRecipe(recipe);

  const newRecipe = new Recipe(recipe);
  await newRecipe.save();
};

export const updateRecipe = async (recipe) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    { _id: recipe.id },
    recipe
  );
  return updatedRecipe;
};

export const findRecipesWithIngredients = async (ingredients) => {
  if (ingredients === "all") {
    const recipes = await Recipe.find({}).sort({
      name: 1,
    });
    return recipes;
  }

  const ors = ingredients.split("|").map((exp) => {
    return {
      $and: exp.split("&").map((exp) => {
        return {
          $or: [
            { name: { $regex: exp, $options: "i" } },
            { ingredients: { $regex: exp, $options: "i" } },
          ],
        };
      }),
    };
  });

  const filters = [
    {
      $match: {
        $or: ors,
      },
    },
  ];

  const recipes = await Recipe.aggregate(filters, function (err, results) {});
  return recipes;
};

export const getRecipeById = async (id) => await Recipe.findById(id);

export const getRecipes = async () => await Recipe.find({}).sort({ name: 1 });

export const deleteRecipe = async (id) => {
  await Recipe.deleteOne({ _id: id });
};
