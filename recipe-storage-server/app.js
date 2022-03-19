var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var logger = require('morgan');
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./routes/users.js");
const recipes = require("./routes/recipes.js");
const storage = require("./routes/storage.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/recipe-storage', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(express.static(path.join(__dirname, 'public')));

// setup users API path
// It is important to have this after the cookieParser and cookieSession so it can use them.
app.use("/users", users.routes);
app.use("/recipes", recipes.routes);
app.use("/storage", storage.routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
