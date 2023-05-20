import express from "express";
import { getNumCalls, addCall } from "../services/calls-service";

const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const numCalls = await getNumCalls(req.params.name);
    return res.send({ numCalls });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/:name", async (req, res) => {
  try {
    await addCall(req.params.name);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
