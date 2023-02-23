const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    imgUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    tags: { type: Array },
  },
  {
    timestamps: true,
  }
);
module.exports = User = mongoose.model("image", userSchema);
