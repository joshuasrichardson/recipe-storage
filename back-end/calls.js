const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

const callSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now, expires: 24 * 60 * 60 },
});

const Call = mongoose.model("Call", callSchema);

router.get("/:name", async (req, res) => {
  try {
    const calls = await Call.find({
      name: req.params.name,
    });
    return res.send({ numCalls: calls.length });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/:name", async (req, res) => {
  try {
    const call = new Call({
      name: req.params.name,
    });
    await call.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
