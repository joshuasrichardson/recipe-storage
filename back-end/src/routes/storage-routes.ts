import express from "express";
import { checkUserValidity } from "../helpers/user-session";
import {
  addItems,
  deleteItem,
  getItem,
  getItemHistory,
  getItemHistoryRecord,
  getItemHistoryRecords,
  getItems,
  updateItem,
  clearStorage,
} from "../services/storage-service";
import { VerifiedUserRequest } from "../types";

const router = express.Router();

router.post("/", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  try {
    const itemAttributes = {
      user: req.user._id,
      code: req.body.code,
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      container: req.body.container,
      expiration: req.body.expiration,
      tags: req.body.tags,
      amount: req.body.amount,
      unit: req.body.unit,
      src: req.body.src,
      added: new Date(),
      deleted: false,
    };
    await addItems(itemAttributes as any, req.body.quantity); // TODO: fix type
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get(
  "/history/code/:code",
  checkUserValidity,
  async (req: VerifiedUserRequest, res) => {
    try {
      const items = await getItemHistoryRecords(req.user._id, req.body.code);
      return res.send(items);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.get(
  "/history/:id",
  checkUserValidity,
  async (req: VerifiedUserRequest, res) => {
    try {
      const item = await getItemHistoryRecord(req.user._id, req.params.id);
      return res.send(item);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.get(
  "/history",
  checkUserValidity,
  async (req: VerifiedUserRequest, res) => {
    try {
      const items = await getItemHistory(req.user._id);
      return res.send(items);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.get("/:id", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  try {
    const item = await getItem(req.user._id, req.params.id);
    return res.send(item);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete(
  "/:id",
  checkUserValidity,
  async (req: VerifiedUserRequest, res) => {
    try {
      await deleteItem(req.user._id, req.params.id);
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.delete("/", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  try {
    await clearStorage(req.user._id);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  try {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const items = await getItems(req.user._id, limit);
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", checkUserValidity, async (req: VerifiedUserRequest, res) => {
  if (req.body.expiration === "Unknown") req.body.expiration = null;
  try {
    const itemAttributes = {
      id: req.params.id,
      user: req.user._id,
      src: req.body.src,
      code: req.body.code,
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      container: req.body.container,
      tags: req.body.tags,
      amount: req.body.amount,
      unit: req.body.unit,
      expiration: req.body.expiration,
      added: req.body.added,
      deleted: req.body.deleted,
    };
    const item = await updateItem(itemAttributes as any); // TODO: fix type
    return res.send(item);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
