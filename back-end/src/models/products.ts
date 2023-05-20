import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model("Product", productSchema);

export default Product;
