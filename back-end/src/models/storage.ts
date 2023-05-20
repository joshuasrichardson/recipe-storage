import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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

const Item = mongoose.model("Item", itemSchema);

export const ItemHistory = mongoose.model("ItemHistory", itemSchema);

export default Item;
