const express = require("express");
const router = express.Router();

/* Require Routes */

// const dashboardRoutes = require("./dashboard.routes");
// const profileRoutes = require("./profile.routes");
// const workoutRoutes = require("./workout.routes");
// const bmiRoutes = require("./bmi.routes");

/* GET home page */

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// router.use("/dashboard", dashboardRoutes);
// router.use("/profile", profileRoutes);
// router.use("/bmi", bmiRoutes);
// router.use("/workout", workoutRoutes);

module.exports = router;
