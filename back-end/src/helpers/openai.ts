import { Configuration, OpenAIApi } from "openai";
import { RecipeI } from "../types";
import { toListString } from "./string-helper";

// Creating an instance of OpenAIApi with API key from the environment variables
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const getRecipeQuery = (
  ingredients: Array<string>,
  recipesToAvoid: Array<string>,
  category: string
): string =>
  `What is a recipe for a ${category} I can make with ${toListString(
    ingredients,
    "and"
  )}? If there are no recipes that only use these items, please suggest a recipe that at least uses some of these. 
  ${
    recipesToAvoid.length
      ? `Please do not sugggest for me to make ${toListString(
          recipesToAvoid,
          "or"
        )}`
      : ""
  }
  Do not suggest stir-fry. I want soup.
  Please do not give me any excuses. Please only respond in the following format with nothing before or after:

    {
        "name": "Chocolate Chip Cookies",
        "numServings": 60,
        "minutes": 30,
        "ingredients": [
            "1 pound butter",
            "2 cups brown sugar",
            "1.5 cups white sugar",
            "3 eggs",
            "1 tablespoon vanilla",
            "1.5 teaspoons salt",
            "1.5 teaspoons baking soda",
            "6 cups flour",
            "4 cups chocolate chips"
        ],
        "steps": [
            "Mix ingredients in a large bowl in order one at a time.",
            "Preheat oven to 350 degrees Fahrenheit.",
            "Spray a cookie sheet with non-stick spray.",
            "Form balls of dough about 1 inch in diameter and place them spread out on the cookie sheet.",
            "Bake for 9-10 minutes.",
            "Let cool for 3 minutes."
        ],
        "materials": [
            "Mixing bowl",
            "Mixing spoon",
            "Cooking sheets",
            "Oven"
        ],
        "description": "Simple but amazing cookies that your family will love."
    }`;

const extractJSON = (str: string): string => {
  const startIndex = str.indexOf("{");
  const endIndex = str.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Invalid input string");
  }

  return str.substring(startIndex, endIndex + 2);
};

export const queryRecipes = async (
  ingredients: string[],
  recipesToAvoid: string[],
  category: string
): Promise<RecipeI> => {
  const prompt = getRecipeQuery(ingredients, recipesToAvoid, category);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that enjoys sharing delicious and nutritious recipes.",
      },
      { role: "user", content: prompt },
    ],
  });

  const completionText = completion.data.choices[0].message.content;
  const recipeJson =
    completionText[0] === "{" &&
    completionText[completionText.length - 1] === "}"
      ? completionText
      : extractJSON(completionText);
  const recipe: RecipeI = JSON.parse(recipeJson);

  return recipe;
};

export default queryRecipes;
