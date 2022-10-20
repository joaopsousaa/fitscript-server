const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    exercises: [
      {
        type: Schema.ObjectId,
      },
    ],
    totalTimeWorkingOut: {
      type: Number,
    },
    waterConsumed: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
