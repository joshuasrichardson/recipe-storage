const { Configuration, OpenAIApi } = require("openai");

// Creating an instance of OpenAIApi with API key from the environment variables
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const getRecipesQuery = (ingredients) =>
  `What are some recipes I can make with ${ingredients
    .slice(0, ingredients.length - 1)
    .join(", ")}, and ${
    ingredients[ingredients.length - 1]
  }? If there are no recipes that only use these items, please suggest recipes that at least use some of these. Please do not give me any excuses. Please only respond in the following format with nothing before or after:

    [
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
        },
        {
            "name": "Chocolate Cake",
            "numServings": 12,
            "minutes": 45,
            "ingredients": [
                "2 cups granulated sugar",
                "1 3/4 cups all-purpose flour",
                "3/4 cup unsweetened cocoa powder",
                "1 1/2 teaspoons baking powder",
                "1 1/2 teaspoons baking soda",
                "1 teaspoon salt",
                "2 large eggs",
                "1 cup milk",
                "1/2 cup vegetable oil",
                "2 teaspoons vanilla extract",
                "1 cup boiling water"
            ],
            "steps": [
                "Preheat oven to 350 degrees Fahrenheit.",
                "Grease and flour two 9-inch round cake pans.",
                "In a large bowl, whisk together sugar, flour, cocoa powder, baking powder, baking soda, and salt.",
                "Add eggs, milk, vegetable oil, and vanilla extract, and beat with an electric mixer on medium speed for 2 minutes.",
                "Stir in boiling water, then pour batter evenly into the prepared cake pans.",
                "Bake for 30-35 minutes, or until a toothpick inserted into the center of the cakes comes out clean.",
                "Cool cakes in pans for 10 minutes, then remove from pans and cool completely on wire racks.",
                "Frost cake with your favorite frosting, if desired.",
                "Serve and enjoy!"
            ],
            "materials": [
                "Mixing bowl",
                "Mixing spoon",
                "Cooking sheets",
                "Oven"
            ],
            "description": "A classic chocolate cake recipe that is easy to make and sure to please a crowd."
            }
    ]`;

const extractJSON = (str) => {
  const startIndex = str.indexOf("[");
  const endIndex = str.lastIndexOf("]");

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Invalid input string");
  }

  return str.substring(startIndex, endIndex + 2);
};

const queryRecipes = async (ingredients) => {
  const prompt = getRecipesQuery(ingredients);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  });

  const completionText = completion.data.choices[0].message.content;
  const recipesJson =
    completionText[0] === "[" &&
    completionText[completionText.length - 1] === "]"
      ? completionText
      : extractJSON(completionText);
  const recipes = JSON.parse(recipesJson);

  return recipes;
};

module.exports = {
  queryRecipes,
};
