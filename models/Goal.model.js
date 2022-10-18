const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["lose weight", "muscle gain"],
    },
    deadline: {
      type: Date,
      required: true,
    },
    owner: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
