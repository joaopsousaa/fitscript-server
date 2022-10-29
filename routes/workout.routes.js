const router = require("express").Router();
const { getExercisesListFromAPI } = require("../utils/index");
const Workout = require("../models/Workout.model");
const { BAD_REQUEST } = require("../utils/status.codes");

router.get("/", async (req, res) => {
  const exercises = await getExercisesListFromAPI();

  return res.json(exercises);
});

router.post("/", (req, res) => {
  const { workout, time } = req.body;
  console.log("WORKOUT", workout);
  Workout.create({ exercises: workout, totalTimeWorkingOut: time })
    .then((createdWorkout) => {
      console.log(createdWorkout);
      return res.json({ createdWorkout });
    })
    .catch(() => {
      return res.status(BAD_REQUEST);
    });
});

module.exports = router;
