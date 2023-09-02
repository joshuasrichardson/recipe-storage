import express from "express";
import { checkUserValidity } from "../helpers/user-session";
import { getContainers, addContainer } from "../services/containers-service";
import { VerifiedUserRequest } from "../types";
import handle from "../helpers/http";

const router = express.Router();

router.get(
  "/",
  checkUserValidity,
  async (req: VerifiedUserRequest<any>, res) => {
    return await handle(async () => await getContainers(req.user), res);
  }
);

router.put(
  "/",
  checkUserValidity,
  async (req: VerifiedUserRequest<any>, res) => {
    return await handle(
      async () => await addContainer(req.user, req.body.container),
      res
    );
  }
);

export default router;
