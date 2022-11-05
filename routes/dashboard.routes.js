const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");
const { BAD_REQUEST } = require("../utils/status.codes");

router.get("/", isAuthenticated, async (req, res) => {
  const userId = req.payload._id;
  const arrayOfWorkoutsDataFromUser = [];

  const user = await User.findById(userId);
  const getUserWorkouts = await Promise.all(
    user.workouts.map(async (workoutId) => {
      const workout = await Workout.findById(workoutId);
      arrayOfWorkoutsDataFromUser.push(workout);
    })
  );
  return res.json(arrayOfWorkoutsDataFromUser);
});

module.exports = router;
