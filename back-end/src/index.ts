import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import routes from "./routes/routes";
import { ONE_MONTH } from "./constants";

const app = express();
console.log("Server started on NODE_ENV:", process.env.NODE_ENV);

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
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  })
);

console.log("Connecting to Mongodb");
mongoose.connect(process.env.MONGODB_URL);
console.log("Connected to Mongodb");

routes.forEach((route) => app.use(route.path, route.router));
console.log("Set up routes");

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT}!`)
);
