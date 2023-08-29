import express from "express";
import { checkUserValidity } from "../helpers/user-session";
import {
  updateRecipe,
  addRecipe,
  findRecipesWithIngredients,
  getRecipeById,
  getRecipes,
  deleteRecipe,
  generateRecipe,
} from "../services/recipes-service";
import { VerifiedUserRequest } from "../types";
import defaultErrorHandler, { handleRequest } from "../helpers/http";

const router = express.Router();

const parseIngredients = (ingredients: string): string[] =>
  ingredients.split("\n");

const parseSteps = (steps: string): string[] => steps.split("\n");

const parseMaterials = (materials: string): string[] => materials.split("\n");

router.post(
  "/generate",
  checkUserValidity,
  async (req: VerifiedUserRequest, res) => {
    return await handleRequest(
      async () => await generateRecipe(req.body.ingredients, req.user),
      res
    );
  }
);

router.post("/", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  try {
    const recipeAttributes = {
      user: req.user,
      name: req.body.name,
      minutes: req.body.minutes,
      numServings: req.body.numServings,
      materials: parseMaterials(req.body.materials),
      ingredients: parseIngredients(req.body.ingredients),
      steps: parseSteps(req.body.steps),
      description: req.body.description,
      link: req.body.link,
      language: req.body.language,
    };

    const recipe = await addRecipe(recipeAttributes, req.body.language);
    return res.send(recipe);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  try {
    const recipeAttributes = {
      id: req.params.id,
      user: req.user,
      name: req.body.name,
      minutes: req.body.minutes,
      numServings: req.body.numServings,
      materials: parseMaterials(req.body.materials),
      ingredients: parseIngredients(req.body.ingredients),
      steps: parseSteps(req.body.steps),
      description: req.body.description,
      link: req.body.link,
      language: req.body.language,
    };

    const recipe = await updateRecipe(recipeAttributes);
    return res.send(recipe);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/withingredient/:ingredients", async (req, res) => {
  try {
    const recipes = await findRecipesWithIngredients(req.params.ingredients);
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  if (req.params.id === "add") return;
  try {
    const recipe = await getRecipeById(req.params.id);
    return res.send(recipe);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await getRecipes();
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", checkUserValidity, async (req, res) => {
  try {
    await deleteRecipe(req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
