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

routes.forEach((route) => app.use(route.path, route.router));

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT}!`)
);
