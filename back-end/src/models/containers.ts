import mongoose from "mongoose";

const containersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  containers: Array,
});

const Containers = mongoose.model("Containers", containersSchema);

export default Containers;
