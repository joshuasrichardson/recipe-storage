var express = require("express");
var router = express.Router();

router.get("/:ingredient", function (req, res) {
  res.send([
    {
      name: "Cookies",
      ingredients: ["stuff"],
      estimatedTime: "5 minutes",
      calories: "500",
    },
  ]);
});

router.get("/", function (req, res) {
  res.send("API is working but not implemented");
});

module.exports = {
  routes: router,
};
