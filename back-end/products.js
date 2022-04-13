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

router.post("/", async (req, res) => {
  try {
    let products = await Product.find({
      code: req.body.code,
    });
    let product = products[0];
    // console.log(product);
    // TODO: Calc number of days to expire.
    if (products.length == 0) {
      product = new Product({
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
      });
      await product.save();
    } else if (
      product.code != req.body.code ||
      product.name != req.body.name ||
      product.brand != req.body.brand ||
      product.description != req.body.description
    ) {
      return res.send({
        id: product._id,
        message: "Item already exists with different attributes.",
        code: product.code,
        name: product.name,
        brand: product.brand,
        description: product.description,
        container: product.container,
      });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    // TODO: average num days to expire then update it.
    let product = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
      }
    );
    console.log(product);
    product.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:code", async (req, res) => {
  try {
    let products = await Product.find({
      code: req.params.code,
    });
    if (products.length == 0) {
      return res.sendStatus(404);
    }
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
