const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");
const { BAD_REQUEST } = require("../utils/status.codes");
/* GET home page */

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
