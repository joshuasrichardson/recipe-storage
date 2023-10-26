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
import {
  AnyUserRequest,
  SupportedLanguage,
  VerifiedUserRequest,
} from "../types";
import defaultErrorHandler, { handleRequest } from "../helpers/http";

const router = express.Router();

const parseIngredients = (ingredients: string): string[] =>
  ingredients.split("\n");

const parseSteps = (steps: string): string[] => steps.split("\n");

const parseMaterials = (materials: string): string[] => materials.split("\n");

router.post(
  "/generate",
  checkUserValidity,
  async (req: VerifiedUserRequest<any>, res) => {
    return await handleRequest(
      async () =>
        await generateRecipe(
          req.body.ingredients,
          req.user as any,
          req.body.category
        ), // TODO: fix type
      res
    );
  }
);

router.post(
  "/",
  checkUserValidity,
  async (req: VerifiedUserRequest<any>, res) => {
    return defaultErrorHandler(async () => {
      const recipeAttributes = {
        user: req.user._id,
        name: req.body.name,
        minutes: req.body.minutes,
        numServings: req.body.numServings,
        materials: parseMaterials(req.body.materials),
        ingredients: parseIngredients(req.body.ingredients),
        steps: parseSteps(req.body.steps),
        description: req.body.description,
        link: req.body.link,
        language: req.body.language,
        added: new Date(),
        wasAutogenerated: false,
      };

      return await addRecipe(recipeAttributes as any, req.body.language); // TODO: fix type
    }, res);
  }
);

router.put(
  "/:id",
  checkUserValidity,
  async (req: VerifiedUserRequest<any>, res) => {
    return defaultErrorHandler(async () => {
      const recipeAttributes = {
        id: req.params.id,
        user: req.user._id,
        name: req.body.name,
        minutes: req.body.minutes,
        numServings: req.body.numServings,
        materials: parseMaterials(req.body.materials),
        ingredients: parseIngredients(req.body.ingredients),
        steps: parseSteps(req.body.steps),
        description: req.body.description,
        link: req.body.link,
        language: req.body.language,
        added: req.body.added,
        wasAutogenerated: req.body.wasAutogenerated,
      };

      return await updateRecipe(recipeAttributes as any); // TODO: fix type
    }, res);
  }
);

router.get(
  "/withingredient/:ingredients",
  async (req: AnyUserRequest<{ language: SupportedLanguage }>, res) => {
    return defaultErrorHandler(async () => {
      return await findRecipesWithIngredients({
        ingredients: req.params.ingredients,
        language: req.query.language,
      });
    }, res);
  }
);

router.get("/:id", async (req, res) => {
  if (req.params.id === "add") return;
  return defaultErrorHandler(
    async () => await getRecipeById(req.params.id),
    res
  );
});

router.get(
  "/",
  async (req: AnyUserRequest<{ language: SupportedLanguage }>, res) => {
    return defaultErrorHandler(async () => {
      return await getRecipes({ language: req.query.language });
    }, res);
  }
);

router.delete("/:id", checkUserValidity, async (req, res) => {
  return defaultErrorHandler(
    async () => await deleteRecipe(req.params.id),
    res
  );
});

export default router;
