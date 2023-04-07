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
  minutes: Number,
  materials: Array,
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

const parseMaterials = (materialsString) => materialsString.split("\n");

router.post("/", validUser, async (req, res) => {
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
    };
    const recipe = new Recipe(recipeAttributes);
    await recipe.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/withingredient/:ingredients", async (req, res) => {
  try {
    const ingredients = req.params.ingredients;
    if (ingredients === "all") {
      const recipes = await Recipe.find({}).sort({
        name: 1,
      });
      return res.send(recipes);
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
    if (recipes.length == 0) {
      return res.sendStatus(404);
    }
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    return res.send(recipe);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({
      name: 1,
    });
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", validUser, async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
