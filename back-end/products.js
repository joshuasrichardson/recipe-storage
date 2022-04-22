const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var fs = require("fs");

const productSchema = new mongoose.Schema({
  code: String,
  name: String,
  brand: String,
  description: String,
  container: String,
  tags: Array,
  amount: Number,
  unit: String,
  src: String,
  avgDaysToExpiration: Number,
});

const Product = mongoose.model("Product", productSchema);

// Configure multer so that it will upload to '/public/images'
const multer = require("multer");
const { IMAGES_DIR } = require("./constants");
const upload = multer({
  dest: IMAGES_DIR + "/images/",
  limits: {
    fileSize: 100000000,
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log("In products post:");
  console.log(req.body);
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file.",
    });
  console.log("file name:", req.file.filename);
  try {
    let products = await Product.find({
      code: req.body.code,
    });
    let product = products[0];
    if (product != null) {
      console.log("Adding src");
      if (product.src != null) {
        fs.unlink("../front-end/public/" + product.src, function (err) {
          if (err) console.log(err);
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }
      product.src = "/images/" + req.file.filename;
      product.save();
    }
    // TODO: Calc number of days to expire.
    if (products.length == 0) {
      product = new Product({
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
        tags: req.body.tags,
        amount: req.body.amount,
        unit: req.body.unit,
        src: "/images/" + req.file.filename,
      });
      await product.save();
    } else if (
      product.code != req.body.code ||
      product.name != req.body.name ||
      product.brand != req.body.brand ||
      product.description != req.body.description ||
      product.tags != req.body.tags ||
      product.amount != req.body.amount ||
      product.unit != req.body.unit
    ) {
      return res.send({
        id: product._id,
        message: "Item already exists with different attributes.",
        code: product.code,
        name: product.name,
        brand: product.brand,
        description: product.description,
        container: product.container,
        tags: product.tags,
        amount: product.amount,
        unit: product.unit,
        src: "/images/" + req.file.filename,
      });
    } else {
      // TODO: Delete the file that was just uploaded or update it
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
        tags: req.body.tags,
        amount: req.body.amount,
        unit: req.body.unit,
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
