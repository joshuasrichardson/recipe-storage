import mongoose from "mongoose";
import { ContainersModel } from "../types";

const containersSchema = new mongoose.Schema<ContainersModel>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  containers: Array,
});

const Containers = mongoose.model<ContainersModel>(
  "Containers",
  containersSchema
);

export default Containers;
