const { Builder, By, Key } = require("selenium-webdriver");
require("chromedriver");
const mongoose = require("mongoose");
const { TEST_DB_URL } = require("./constants");

let driver;

beforeEach(async () => {
  mongoose.connect(TEST_DB_URL);
  mongoose.connection.dropDatabase((err, result) => {
    if (err) console.log("Connection error:", err);
  });
});

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

afterEach(async () => {
  mongoose.connection.close();
});

afterAll(async () => {
  await driver.quit();
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const tryCreateAccount = async (first, last, username, password, password2) => {
  await driver.get("http://localhost:8000");
  await driver.findElement(By.name("Create Account")).click();

  expect(await driver.findElement(By.id("logo-text")).getText()).toEqual(
    "Storage Recipe"
  );

  await driver.findElement(By.id("first-name")).sendKeys(first);
  await driver.findElement(By.id("last-name")).sendKeys(last);
  await driver.findElement(By.id("username")).sendKeys(username);
  await driver.findElement(By.id("password")).sendKeys(password);
  await driver.findElement(By.id("password2")).sendKeys(password2);

  const createButton = await driver.findElement(By.name("false,Create"));
  await driver.findElement(By.css("body")).sendKeys(Key.PAGE_DOWN);
  await sleep(500);
  await createButton.click();
  await sleep(500);
};

const tryLogin = async (username, password) => {
  await driver.get("http://localhost:8000");
  await driver.findElement(By.name("Login")).click();

  expect(await driver.findElement(By.id("logo-text")).getText()).toEqual(
    "Storage Recipe"
  );

  await driver.findElement(By.id("username")).sendKeys(username);
  await driver.findElement(By.id("password")).sendKeys(password);

  const loginButton = await driver.findElement(By.name("Login,false"));
  await driver.findElement(By.css("body")).sendKeys(Key.PAGE_DOWN);
  await sleep(500);
  await loginButton.click();
  await sleep(500);
};

describe("registration", () => {
  it("should register a user when all fields are valid", async () => {
    await tryCreateAccount(
      "Joshua",
      "Richardson",
      "joshua",
      "mock password",
      "mock password"
    );
    expect(await driver.findElement(By.id("logo-text")).getText()).toEqual(
      "joshua"
    );
  });
});

describe("login", () => {
  it("should fail to login when username or password is incorrect", async () => {
    await tryLogin("joshua", "doesn't exist");
    expect(await driver.findElement(By.id("logo-text")).getText()).toEqual(
      "Storage Recipe"
    );
    expect(
      await driver.findElement(
        By.xpath("//p[text()='username or password is wrong']")
      )
    ).toBeDefined();
  });
});
