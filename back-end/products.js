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
  console.log("File:", req.file);
  console.log("Body:", req.body);
  try {
    // Get the product if it exists
    let products = await Product.find({
      code: req.body.code,
    });
    let product = products[0];

    // By default the path to the image is empty
    let imagePath = "";
    if (req.file) {
      // If the image is specified, update it.
      imagePath = "/images/" + req.file.filename;
      if (product) {
        console.log("Adding src");
        if (product.src != null) {
          fs.unlink("../front-end/public/" + product.src, function (err) {
            if (err) console.log(err);
            // if no error, file has been deleted successfully
            console.log("Old file deleted!");
          });
        }
        product.src = imagePath;
        product.save();
      }
    }

    // TODO: Calc number of days to expire.
    // If the product doesn't exist yet, make a new one.
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
        src: imagePath,
      });
      await product.save();
    } else if (
      product.code != req.body.code ||
      product.name != req.body.name ||
      product.brand != req.body.brand ||
      product.description != req.body.description ||
      product.container != req.body.container ||
      product.tags != req.body.tags ||
      product.amount != req.body.amount ||
      product.unit != req.body.unit
    ) {
      // If the item exists, but the information is a little different, send back a response showing what is different.
      console.log("It's different");
      console.log(product.code != req.body.code);
      console.log(product.name != req.body.name);
      console.log("Name before: ", product.name);
      console.log("Name after: ", req.body.name);
      console.log(product.brand != req.body.brand);
      console.log(product.description != req.body.description);
      console.log(product.container != req.body.container);
      console.log(product.tags != req.body.tags);
      console.log(product.amount != req.body.amount);
      console.log(product.unit != req.body.unit);
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
        src: product.src,
      });
    }
    // If nothing changed, we don't actually need to do anything.
    return res.send({ src: product.src });
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
