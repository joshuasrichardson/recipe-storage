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
  tags: Array,
  amount: Number,
  unit: String,
  src: String,
  added: {
    type: Date,
    default: Date.now,
  },
  deleted: Boolean,
});

const Item = mongoose.model("Item", itemSchema);

const ItemHistory = mongoose.model("ItemHistory", itemSchema);

router.post("/", validUser, async (req, res) => {
  console.log(req.body);
  try {
    const itemAttributes = {
      user: req.user,
      code: req.body.code,
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      container: req.body.container,
      expiration: req.body.expiration,
      tags: req.body.tags,
      amount: req.body.amount,
      unit: req.body.unit,
      src: req.body.src,
    };
    for (let i = 0; i < req.body.quantity; ++i) {
      const item = new Item(itemAttributes);
      await item.save();
      const itemHist = new ItemHistory(itemAttributes);
      await itemHist.save();
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my history items using a barcode
router.get("/history/code/:code", validUser, async (req, res) => {
  try {
    const items = await ItemHistory.find({
      user: req.user,
      code: req.params.code,
    }).sort({ added: -1 }); // replace the user ids with objects representing the users
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my history item
router.get("/history/:id", validUser, async (req, res) => {
  try {
    const items = await ItemHistory.find({
      user: req.user,
      _id: req.params.id,
    }).populate("user"); // replace the user ids with objects representing the users
    return res.send(items[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my adding and deleting history
router.get("/history", validUser, async (req, res) => {
  try {
    const items = await ItemHistory.find({
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

// delete my item
router.delete("/:id", validUser, async (req, res) => {
  try {
    const doc = await Item.findById(req.params.id);
    // add the item deletion to the food storage history
    if (doc != null) {
      let obj = doc.toObject();
      delete obj._id;
      obj.added = Date.now();
      obj.deleted = true;
      const docClone = new ItemHistory(obj);
      await docClone.save();
    }

    await Item.deleteOne({
      user: req.user,
      _id: req.params.id,
    });

    return res.sendStatus(200);
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
        expiration: 1,
      })
      .populate("user"); // replace the user ids with objects representing the users
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  console.log("Put item body:", req.body);
  if (req.body.expiration === "Unknown") req.body.expiration = null;
  try {
    let item = await Item.findByIdAndUpdate(
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
        expiration: req.body.expiration,
      }
    );
    console.log("Put storage item:", item);
    item.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
