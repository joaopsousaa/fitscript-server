const router = require("express").Router();
//const Bmi = require("../models/Goal.model");
const { BAD_REQUEST } = require("../utils/status.codes");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const Goal = require("../models/Goal.model");
const { addMonths, isValid } = require("date-fns");

router.post("/", isAuthenticated, (req, res) => {
  const { title, deadline } = req.body;
  console.log(title, deadline);
  if (!title) {
    return res.status(BAD_REQUEST).json({ message: "Please select your goal" });
  }

  if (!deadline) {
    return res.status(BAD_REQUEST).json({ message: "Please enter deadline" });
  }
  const userId = req.payload._id;
  Goal.create({ title: title, deadline: deadline }).then((goalCreated) => {
    const goalCreatedId = goalCreated._id;

    console.log("goal created", goalCreated);

    User.findByIdAndUpdate(
      userId,
      { $push: { goals: goalCreatedId } },
      { new: true }
    )
      .then((userGoal) => {
        console.log(userGoal);
      })
      .catch(() => {
        return res.status(BAD_REQUEST);
      });
    return res.json({ goalCreated });
  });
});

module.exports = router;
