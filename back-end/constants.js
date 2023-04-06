const {
  DEV_MONGODB_URL,
  TEST_MONGODB_URL,
  PROD_MONGODB_URL,
} = require("./mongo-url");

const prod = {
  MONGODB_URL: PROD_MONGODB_URL,
  IMAGES_DIR: "../../../../var/www/foodstorage.joshuasrichardson.com",
};
const dev = {
  MONGODB_URL: DEV_MONGODB_URL,
  IMAGES_DIR: "../front-end/public",
};
const test = {
  MONGODB_URL: TEST_MONGODB_URL,
  IMAGES_DIR: "../front-end/public",
};

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "";

const constants = () => {
  switch (env) {
    case "development":
      return dev;
    case "test":
      return test;
    default:
      return prod;
  }
};

module.exports = constants();
