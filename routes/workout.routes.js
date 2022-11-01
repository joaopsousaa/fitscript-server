const router = require("express").Router();
const { getExercisesListFromAPI } = require("../utils/index");
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");
const { BAD_REQUEST } = require("../utils/status.codes");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", async (req, res) => {
  const exercises = await getExercisesListFromAPI();

  return res.json(exercises);
});

router.post("/", isAuthenticated, (req, res) => {
  console.log(`req.payload`, req.payload);
  const userId = req.payload._id;
  const { workout, time } = req.body;
  console.log("WORKOUT", workout);
  Workout.create({ exercises: workout, totalTimeWorkingOut: time })
    .then((createdWorkout) => {
      console.log(createdWorkout);
      const workoutId = createdWorkout._id;
      console.log(workoutId);

      User.findByIdAndUpdate(
        userId,
        { $push: { workouts: workoutId } },
        { new: true }
      )
        .then((newUserWorkout) => {
          console.log(newUserWorkout);
        })
        .catch(() => {
          return res.status(BAD_REQUEST);
        });
      return res.json({ createdWorkout });
    })
    .catch(() => {
      return res.status(BAD_REQUEST);
    });
});

module.exports = router;
