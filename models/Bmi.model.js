const { Schema, model } = require("mongoose");

const bmiSchema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      enum: ["m", "f"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bmi = model("Bmi", bmiSchema);

module.exports = Bmi;
