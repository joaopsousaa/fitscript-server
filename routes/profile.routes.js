const express = require("express");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const { BAD_REQUEST } = require("../utils/status.codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", isAuthenticated, (req, res) => {
  const { name, email, birthdate, gender, password, confirmPassword } =
    req.body;
  const userId = req.payload._id;
  console.log(userId);
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

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (password !== confirmPassword) {
    return res.status(BAD_REQUEST).json({ message: "Passwords don't match" });
  }
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // if (!smoking) {
  //   return res
  //     .status(BAD_REQUEST)
  //     .json({ message: "Please select one of the option" });
  // }

  // if (!alcohol) {
  //   return res
  //     .status(BAD_REQUEST)
  //     .json({ message: "Please select one of the option" });
  // }

  User.findOne({
    $or: [{ email }],
    _id: { $ne: userId },
  })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(BAD_REQUEST).json({ message: "User exist" });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          gender,
          // smoking,
          // alcohol,
          birthdate,
          password: hashedPassword,
        },
        { new: true }
      );
    })
    .then((updatedUser) => {
      const { _id, email, name, gender, birthdate } = updatedUser;
      const payload = { _id, email, name };
      console.log(updatedUser);
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "12h",
      });
      return res.json({ user: updatedUser, token });
    });
});

module.exports = router;
