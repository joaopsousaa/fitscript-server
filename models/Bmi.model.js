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
  },
  {
    timestamps: true,
  }
);

const Bmi = model("Bmi", bmiSchema);

module.exports = Bmi;
