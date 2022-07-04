const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./constants");

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

console.log("Mongodb url:", config.MONGODB_URL);
// connect to the mongodb database
mongoose.connect(config.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["secretValue"],
    cookie: {
      maxAge: 31 * 24 * 60 * 60 * 1000, // About a month
    },
  })
);

// setup users API path
// It is important to have this after the cookieParser and cookieSession so it can use them.
const users = require("./users.js");
app.use("/api/users", users.routes);
const recipes = require("./recipes.js");
app.use("/api/recipes", recipes.routes);
const storage = require("./storage.js");
app.use("/api/storage", storage.routes);
const products = require("./products.js");
app.use("/api/products", products.routes);
const containers = require("./containers.js");
app.use("/api/containers", containers.routes);

app.listen(3002, () => console.log("Server listening on port 3002!"));
