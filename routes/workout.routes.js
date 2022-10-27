const router = require("express").Router();
const { getExercisesListFromAPI } = require("../utils/index");

// const { isAuthenticated } = require("../middleware/jwt.middleware");
const Exercise = require("../models/Exercise.model");
const Workout = require("../models/Workout.model");
const { BAD_REQUEST } = require("../utils/status.codes");

router.get("/", async (req, res) => {
  const exercises = await getExercisesListFromAPI();

  return res.json(exercises);
});

router.post("/", (req, res) => {
  const exerciseFromFrontEnd = req.body;
  // console.log("ExerciseFromFront", exerciseFromFrontEnd);
  // const { workoutType, exerciseName, set } = req.body;

  Exercise.create({ ...exerciseFromFrontEnd })
    .then((exerciseCreated) => {
      // console.log(exerciseCreated);
      const { id } = exerciseCreated;
      Workout.create({ exercises: id })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      return res.json({ exerciseCreated });
    })
    .catch(() => {
      return res.status(BAD_REQUEST);
    });
});

module.exports = router;
