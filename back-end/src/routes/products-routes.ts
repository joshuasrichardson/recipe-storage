import express from "express";
import upload from "../helpers/uploader";
import {
  addProduct,
  updateProduct,
  getProductByCode,
} from "../services/products-service";
import { VerifiedUserRequest } from "../types";
import defaultErrorHandler from "../helpers/http";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  async (req: VerifiedUserRequest, res) => {
    return defaultErrorHandler(async () => {
      const newProduct = {
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
        tags: req.body.tags,
        amount: req.body.amount,
        unit: req.body.unit,
        src: req.file ? "/images/" + req.file.filename : req.body.src || "",
      };
      const response = await addProduct(newProduct, req.file);
      return res.send(response);
    }, res);
  }
);

router.put("/:id", async (req, res) => {
  return defaultErrorHandler(async () => {
    const product = {
      code: req.body.code,
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      container: req.body.container,
      tags: req.body.tags,
      amount: req.body.amount,
      unit: req.body.unit,
    };
    await updateProduct(req.params.id, product);
    return res.sendStatus(200);
  }, res);
});

router.get("/:code", async (req, res) => {
  return defaultErrorHandler(
    async () => res.send({ product: await getProductByCode(req.params.code) }),
    res
  );
});

export default router;
