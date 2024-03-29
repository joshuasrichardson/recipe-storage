import mongoose from "mongoose";
import { RecipeI, RecipeModel } from "../types";

const recipeSchema = new mongoose.Schema<RecipeI>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: String,
  minutes: Number,
  materials: Array,
  numServings: Number,
  ingredients: Array,
  steps: Array,
  description: String,
  link: String,
  generatedWith: Array,
  added: {
    type: Date,
    default: Date.now,
  },
  wasAutogenerated: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "en",
  },
});

const Recipe = mongoose.model<RecipeModel>("Recipe", recipeSchema);

export default Recipe;
