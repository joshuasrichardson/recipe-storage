const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

const productSchema = new mongoose.Schema({
  code: String,
  name: String,
  brand: String,
  description: String,
  container: String,
  avgDaysToExpiration: Number,
});

const Product = mongoose.model("Product", productSchema);

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    let product = await Product.find({
      code: req.body.code,
    });
    console.log(product);
    // TODO: Calc number of days to expire.
    if (product.length == 0) {
      product = new Product({
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
      });
      await product.save();
    } else {
      // TODO: average num days to expire then update it.
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:code", async (req, res) => {
  try {
    let product = await Product.find({
      code: req.params.code,
    });
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
