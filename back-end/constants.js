const DEV_MONGODB_URL = require("./mongo-url");

const prod = {
  MONGODB_URL: "mongodb://localhost:27017/recipe-storage",
  IMAGES_DIR: "../../../../var/www/joshumi.joshuasrichardson.com",
};
const dev = {
  MONGODB_URL: DEV_MONGODB_URL,
  IMAGES_DIR: "../front-end/public",
};

module.exports = process.env.NODE_ENV?.trim() === "development" ? dev : prod;
