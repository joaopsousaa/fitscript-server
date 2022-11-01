const express = require("express");
const { User } = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const { BAD_REQUEST } = require("../utils/status.codes");
const { jwtMiddleware } = require("express-jwt-middleware");

router.post("/", isAuthenticated, (req, res) => {
  const { name, email, birthdate, smoking, alcohol, gender } = req.body;
  const { user } = req;

  if (!name) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Please provide your name" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    res.status(BAD_REQUEST).json({ message: "Provide a valid email address" });
    return;
  }

  if (!gender) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Please provide your gender type" });
  }

  if (!smoking) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Please select one of the option" });
  }

  if (!alcohol) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Please select one of the option" });
  }

  User.findOne({
    $or: [{ email }],
    _id: [{ $ne: user._id }],
  })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(BAD_REQUEST).json({ message: "User exist" });
      }
      return User.findByIdAndUpdate(
        user._id,
        {
          name,
          email,
          gender,
          smoking,
          alcohol,
          birthdate,
        },
        { new: true }
      );
    })
    .then((updatedUser) => {
      console.log(updatedUser);
      const token = jwtMiddleware.sign(
        { _id: user._id, name: updatedUser.name },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "12h" }
      );
      return res.json({ user: updatedUser, token });
    });
});

module.exports = router;
