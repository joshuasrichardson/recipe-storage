import express from "express";
import { getNumCalls, addCall } from "../services/calls-service";
import handle from "../helpers/http";

const router = express.Router();

router.get(
  "/:name",
  async (req, res) =>
    await handle(
      async () => ({ numCalls: await getNumCalls(req.params.name) }),
      res
    )
);

router.post(
  "/:name",
  async (req, res) =>
    await handle(async () => ({ call: await addCall(req.params.name) }), res)
);

export default router;
