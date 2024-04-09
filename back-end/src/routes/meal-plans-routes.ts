import express from "express";
import { getMealPlans, addMealPlan } from "../services/meal-plans-service";
import handle from "../helpers/http";
import { checkUserValidity } from "../helpers/user-session";
import { MealPlanI, VerifiedUserRequest } from "../types";

const router = express.Router();

router.get(
  "/",
  checkUserValidity,
  async (req: VerifiedUserRequest<any>, res) =>
    await handle(async () => ({ mealPlans: await getMealPlans(req.user) }), res)
);

router.post(
  "/",
  checkUserValidity,
  async (req: VerifiedUserRequest<MealPlanI>, res) =>
    await handle(
      async () => ({
        mealPlan: await addMealPlan(req.body.mealPlan, req.user),
      }),
      res
    )
);

export default router;
