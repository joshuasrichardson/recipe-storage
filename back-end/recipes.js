const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const users = require("./users.js");
const validUser = users.valid;

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: String,
  numServings: Number,
  ingredients: Array,
  steps: Array,
  description: String,
  link: String,
  added: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const parseIngredients = (ingredientsString) => ingredientsString.split("\n");

const parseSteps = (stepsString) => stepsString.split("\n");

router.post("/", validUser, async (req, res) => {
  try {
    const recipeAttributes = {
      user: req.user,
      name: req.body.name,
      numServings: req.body.numServings,
      ingredients: parseIngredients(req.body.ingredients),
      steps: parseSteps(req.body.steps),
      description: req.body.description,
      link: req.body.link,
    };
    const recipe = new Recipe(recipeAttributes);
    await recipe.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:ingredient", async (req, res) => {
  res.send([
    {
      name: "Cookies",
      ingredients: ["stuff"],
      estimatedTime: "5 minutes",
      calories: "500",
    },
  ]);
});

router.get("/", async (req, res) => {
  try {
    let recipes = await Recipe.find({}).sort({
      name: 1,
    });
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
