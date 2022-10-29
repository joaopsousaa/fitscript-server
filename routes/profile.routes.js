const express = require("express");
const { User } = require("../models/User.model");
const isAuthenticated = require("/middleware/jwt.middleware");
const profileRouter = express.Router();
const { BAD_REQUEST } = require("../utils/status.codes");
const { jwtMiddleware } = require("express-jwt-middleware");

profileRouter.post("/edit", isAuthenticated, (req, res) => {
  const {
    username,
    name,
    email,
    birthdate,
    password,
    smoking,
    alcohol,
    gender,
  } = req.body;
  const { user } = req;

  if (!username) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Please provide your username" });
  }

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

  User.findone({
    $or: [{ username }, { email }],
    _id: [{ $ne: user._id }],
  }).then((foundUser) => {
    if (foundUser) {
      return res.status(BAD_REQUEST).json({ message: "User exist" });
    }

    User.findByIdAndUpdate(
      user._id,
      {
        username,
        name,
        email,
        gender,
        smoking,
        alcohol,
        birthdate,
        password,
      },
      { new: true }
    ).then((updatedUser) => {
      const token = jwtMiddleware.sign(
        { _id: user._id, username: updatedUser.username },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "12h" }
      );
      res.json({ user: updatedUser, token });
    });
  });
});

module.exports = profileRouter;
