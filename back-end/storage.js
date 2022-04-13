const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const users = require("./users.js");
const validUser = users.valid;

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  code: String,
  name: String,
  brand: String,
  description: String,
  container: String,
  expiration: Date,
  added: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);

router.post("/", validUser, async (req, res) => {
  console.log(req);
  const item = new Item({
    user: req.user,
    code: req.body.code,
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    container: req.body.container,
    expiration: req.body.expiration,
  });
  try {
    await item.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my item
router.get("/:id", validUser, async (req, res) => {
  try {
    let items = await Item.find({
      user: req.user,
      _id: req.params.id,
    }).populate("user"); // replace the user ids with objects representing the users
    return res.send(items[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my items
router.get("/", validUser, async (req, res) => {
  try {
    let items = await Item.find({
      user: req.user,
    })
      .sort({
        added: -1,
      })
      .populate("user"); // replace the user ids with objects representing the users
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
