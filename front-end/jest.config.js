module.exports = {
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/mockStyles.js",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./setupTests.js"],
};
