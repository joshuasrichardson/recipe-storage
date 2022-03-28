const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors = require('cors');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/recipe-storage', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// setup users API path
// It is important to have this after the cookieParser and cookieSession so it can use them.
const users = require("./users.js");
app.use("/users", users.routes);
const recipes = require("./recipes.js");
app.use("/recipes", recipes.routes);
const storage = require("./storage.js");
app.use("/storage", storage.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));
