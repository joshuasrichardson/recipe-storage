import MealPlan from "../models/meal-plans";
import { MealPlanI, UserI } from "../types";

export const getMealPlans = async (user: UserI): Promise<MealPlanI[]> => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekFromToday = new Date(today);
  oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7);

  return await MealPlan.find({
    user,
    date: {
      $gte: yesterday,
      $lt: oneWeekFromToday,
    },
  });
};

export const addMealPlan = async (
  mealPlan: MealPlanI,
  user: UserI
): Promise<MealPlanI> => {
  return await MealPlan.findByIdAndUpdate(
    mealPlan._id,
    {
      ...mealPlan,
      user,
    },
    {
      new: true,
      upsert: true,
    }
  );
};
