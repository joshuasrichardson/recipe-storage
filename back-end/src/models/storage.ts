import mongoose from "mongoose";
import { ItemI, ItemModel } from "../types";

const itemSchema = new mongoose.Schema<ItemI>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  code: String,
  name: String,
  brand: String,
  description: String,
  container: String,
  expiration: Date,
  tags: Array,
  amount: Number,
  unit: String,
  src: String,
  added: {
    type: Date,
    default: Date.now,
  },
  deleted: Boolean,
});

const Item = mongoose.model<ItemModel>("Item", itemSchema);

export const ItemHistory = mongoose.model("ItemHistory", itemSchema);

export default Item;
