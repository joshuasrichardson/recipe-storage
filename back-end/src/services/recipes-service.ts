import Recipe from "../models/recipes";
import { queryRecipes } from "../helpers/openai";
import { translate } from "../helpers/translation";
import { RecipeI, SupportedLanguage, UserRef } from "../types";

export const translateRecipe = async (recipe: RecipeI): Promise<RecipeI> => {
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
};

export const generateRecipe = async (
  ingredients: Array<string>,
  user: UserRef,
  category: string
): Promise<RecipeI> => {
  const recipesWithIngredient = (
    await findRecipesWithIngredients({
      ingredients: ingredients.join("|"),
      language: (user as any).language,
    })
  ).map((recipe) => recipe.name);

  const recipeQueryResult = await queryRecipes(
    ingredients,
    recipesWithIngredient,
    category
  );
  const generatedRecipe = {
    ...recipeQueryResult,
    user,
    wasAutogenerated: true,
    generatedWith: ingredients,
  };

  const translatedRecipePromise = translateRecipe(generatedRecipe);

  const recipe = new Recipe(generatedRecipe);

  recipe.save();

  return (user as any).language !== "ja" // TODO: fix type
    ? recipe
    : await translatedRecipePromise;
};

export const addRecipe = async (
  recipe: RecipeI,
  language: SupportedLanguage
): Promise<RecipeI> => {
  if (language === "en") translateRecipe(recipe);

  const newRecipe = new Recipe(recipe);
  return await newRecipe.save();
};

export const updateRecipe = async (recipe: RecipeI): Promise<RecipeI> => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    { _id: recipe.id },
    recipe
  );
  return updatedRecipe;
};

interface FindRecipesWithIngredients {
  ingredients: string;
  language: SupportedLanguage;
}

export const findRecipesWithIngredients = async ({
  ingredients,
  language,
}: FindRecipesWithIngredients): Promise<Array<RecipeI>> => {
  if (ingredients === "all") {
    const recipes = await Recipe.find({
      $or: [{ language }, { language: undefined }],
    }).sort({ language: -1, name: 1 });
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

  const recipes = await Recipe.aggregate(filters);
  return recipes;
};

export const getRecipeById = async (id: string): Promise<RecipeI> =>
  await Recipe.findById(id);

interface GetRecipesProps {
  language: SupportedLanguage;
}

export const getRecipes = async ({
  language,
}: GetRecipesProps): Promise<Array<RecipeI>> => {
  return await Recipe.find({
    $or: [{ language: language }, { language: undefined }],
  }).sort({ language: 1, name: 1 });
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await Recipe.deleteOne({ _id: id });
};
