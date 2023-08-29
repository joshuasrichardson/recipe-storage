import mongoose from "mongoose";
import { ProductI } from "../types";

const productSchema = new mongoose.Schema<ProductI>({
  code: String,
  name: String,
  brand: String,
  description: String,
  container: String,
  tags: Array,
  amount: Number,
  unit: String,
  src: String,
  avgDaysToExpiration: Number,
});

const Product = mongoose.model<ProductI>("Product", productSchema);

export default Product;
