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
    fileSize: 1048576,
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log("In products post:");
  console.log("File:", req.file);
  console.log("Body:", req.body);
  try {
    // Get the product if it exists
    let products = await Product.find({
      code: req.body.code,
    });
    let product = products[0];

    // By default the path to the image is empty
    if (req.file && product) {
      // If the image is specified, update it.
      let imagePath = "/images/" + req.file.filename;
      if (product.src) {
        fs.copyFile(
          IMAGES_DIR + imagePath,
          IMAGES_DIR + product.src,
          0,
          function (err) {
            if (err) console.log(err);
            // if no error, file has been replaced successfully
            console.log("Old file replaced!");
          }
        );
      } else {
        product.src = imagePath;
        product.save();
      }
    }

    // TODO: Calc number of days to expire.
    // If the product doesn't exist yet, make a new one.
    if (!products.length) {
      product = new Product({
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
        tags: req.body.tags,
        amount: req.body.amount,
        unit: req.body.unit,
        src: req.file
          ? "/images/" + req.file.filename
          : req.body.src
          ? req.body.src
          : "",
      });
      await product.save();
    } else if (
      product &&
      (product.code || product.name) &&
      (product.code != req.body.code ||
        product.name != req.body.name ||
        product.brand != req.body.brand ||
        product.description != req.body.description ||
        product.tags != req.body.tags ||
        product.amount != req.body.amount ||
        product.unit != req.body.unit)
    ) {
      // If the item exists, but the information is a little different, send back a response showing what is different.
      return res.send({
        message: "Item already exists with different attributes.",
        product: product,
      });
    } else if (req.body.src) {
      product.src = req.body.src;
      product.save();
    }
    // If nothing changed, we don't actually need to do anything.
    return res.send({ product: product });
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
