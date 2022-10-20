const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Cardio", "Strenght"],
    },
    exerciseName: {
      type: String,
    },
    numberOfReps: {
      type: Number,
    },
    numberOfSets: {
      type: Number,
    },
    totalWeightLifted: {
      type: Number,
    },
    totalCaloriesBurned: {
      type: Number,
    },
    workoutId: { type: Schema.Types.ObjectId, ref: "Workout" },
  },
  {
    timestamps: true,
  }
);

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
