import mongoose from "mongoose";
import { MealPlanModel } from "../types";

const mealPlanSchema = new mongoose.Schema<MealPlanModel>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: Date,
  breakfast: Array,
  lunch: Array,
  dinner: Array,
  snacks: Array,
});

const MealPlan = mongoose.model<MealPlanModel>("MealPlan", mealPlanSchema);

export default MealPlan;
