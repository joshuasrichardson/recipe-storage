import express from "express";
import upload from "../helpers/uploader";
import {
  addProduct,
  updateProduct,
  getProductByCode,
} from "../services/products-service";
import { GetUserAuthInfoRequest } from "../types";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  async (req: GetUserAuthInfoRequest, res) => {
    try {
      const newProduct = {
        code: req.body.code,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        container: req.body.container,
        tags: req.body.tags,
        amount: req.body.amount,
        unit: req.body.unit,
        src: req.file
          ? "/images/" + req.file.filename
          : req.body.src
          ? req.body.src
          : "",
      };
      const response = await addProduct(newProduct, req.file);
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.put("/:id", async (req, res) => {
  try {
    const product = {
      id: req.params.id,
      code: req.body.code,
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      container: req.body.container,
      tags: req.body.tags,
      amount: req.body.amount,
      unit: req.body.unit,
    };
    await updateProduct(product);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:code", async (req, res) => {
  try {
    return res.send({ product: await getProductByCode(req.params.code) });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
