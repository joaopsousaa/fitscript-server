const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    workoutType: {
      type: String,
      enum: ["cardio", "strength"],
    },
    exerciseName: {
      type: String,
    },
    set: [{ numberOfReps: Number, weightLifted: Number }],

    totalCaloriesBurned: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
