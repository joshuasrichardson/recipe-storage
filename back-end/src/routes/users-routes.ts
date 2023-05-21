import { Router } from "express";
import { createUser, updateUser, login } from "../services/users-service";
import { ErrorMessage } from "../constants";
import { checkUserValidity } from "../helpers/user-session";
import { GetUserAuthInfoRequest } from "../types";

const router = Router();

router.post("/", async (req: GetUserAuthInfoRequest, res) => {
  try {
    const userAttributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      language: req.body.language || "en",
    };

    const user = await createUser(userAttributes);
    req.session.userID = user._id;

    return res.send({ user });
  } catch (error) {
    console.log(error);
    if (Object.values(ErrorMessage).includes(error))
      return res.status(400).send({ message: error });
    return res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  const user = req.body.user;

  try {
    const updatedUser = await updateUser(user);
    return res.send({ user: updatedUser });
  } catch (error) {
    console.log(error);
    if (Object.values(ErrorMessage).includes(error))
      return res.status(400).send({ message: error });
    return res.sendStatus(500);
  }
});

router.post("/login", async (req: GetUserAuthInfoRequest, res) => {
  try {
    const user = await login(req.body.username, req.body.password);

    req.session.userID = user.id;
    console.log("UserID", req.session.userID);
    console.log(req.session);

    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get logged in user
router.get("/", checkUserValidity, async (req: GetUserAuthInfoRequest, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// logout
router.delete(
  "/",
  checkUserValidity,
  async (req: GetUserAuthInfoRequest, res) => {
    try {
      req.session = null;
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

export default router;
