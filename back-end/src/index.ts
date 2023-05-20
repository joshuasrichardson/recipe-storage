import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import users from "./routes/users-routes";
import recipes from "./routes/recipes-routes";
import storage from "./routes/storage-routes";
import products from "./routes/products-routes";
import containers from "./routes/containers-routes";
import calls from "./routes/calls-routes";
import { ONE_MONTH } from "./constants";

const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["secretValue"],
    cookie: {
      maxAge: ONE_MONTH,
    },
  })
);

console.log("Connecting to Mongodb with url:", process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL);

app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/storage", storage);
app.use("/api/products", products);
app.use("/api/containers", containers);
app.use("/api/calls", calls);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT}!`)
);
