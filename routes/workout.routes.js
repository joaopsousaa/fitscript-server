const router = require("express").Router();
const { getExercisesListFromAPI } = require("../utils/index");

// const { isAuthenticated } = require("../middleware/jwt.middleware");
const Exercise = require("../models/Exercise.model");
const { BAD_REQUEST } = require("../utils/status.codes");

router.get("/", async (req, res) => {
  const exercises = await getExercisesListFromAPI();

  return res.json(exercises);
});

router.post("/", (req, res) => {
  const exerciseFromFrontEnd = req.body;
  console.log(exerciseFromFrontEnd);
  Exercise.create({ ...exerciseFromFrontEnd })
    .then((exercise) => {
      return res.json(exercise);
    })
    .catch(() => {
      return res.status(BAD_REQUEST);
    });
});

module.exports = router;
