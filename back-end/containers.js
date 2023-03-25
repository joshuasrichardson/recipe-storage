const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const users = require("./users.js");
const validUser = users.valid;

const containersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  containers: Array,
});

const Containers = mongoose.model("Containers", containersSchema);

router.get("/", validUser, async (req, res) => {
  try {
    const containers = await Containers.find({
      user: req.user,
    }).sort({
      containers: 1,
    });
    return res.send(containers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/", validUser, async (req, res) => {
  try {
    let userContainers = await Containers.findOne({
      user: req.user,
    });
    console.log("containers:", userContainers);
    console.log("req.body:", req.body);
    if (!userContainers) {
      userContainers = new Containers({
        user: req.user,
        containers: [req.body.container],
      });
    } else if (!userContainers || !userContainers.containers.includes(req.body.container)) {
      userContainers.containers.push(req.body.container);
    }
    await userContainers.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
