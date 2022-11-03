const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    exercises: [
      {
        name: {
          type: String,
        },
        sets: [{ numberOfReps: Number, weightLifted: Number }],

        totalCaloriesBurned: {
          //investigate computed MONGODB properties
          type: Number,
        },
      },
    ],
    totalTimeWorkingOut: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
