import express from "express";
import { checkUserValidity } from "../helpers/user-session";
import { getContainers, addContainer } from "../services/containers-service";
import { GetUserAuthInfoRequest } from "../types";

const router = express.Router();

router.get("/", checkUserValidity, async (req: GetUserAuthInfoRequest, res) => {
  try {
    const containers = await getContainers(req.user);
    return res.send(containers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/", checkUserValidity, async (req: GetUserAuthInfoRequest, res) => {
  try {
    const containers = await addContainer(req.user, req.body.container);
    return res.send(containers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
