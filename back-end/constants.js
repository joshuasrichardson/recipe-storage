const DEV_MONGODB_URL = require("./mongo-url");

const prod = {
  MONGODB_URL: "mongodb://localhost:27017/recipe-storage",
};
const dev = {
  MONGODB_URL: DEV_MONGODB_URL,
};

module.exports = process.env.NODE_ENV?.trim() === "development" ? dev : prod;
