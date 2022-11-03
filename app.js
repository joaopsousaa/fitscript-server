// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/dashboard", dashboardRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const workoutRoutes = require("./routes/workout.routes");
app.use("/workout", workoutRoutes);

const bmiRoutes = require("./routes/bmi.routes");
app.use("/bmi", bmiRoutes);

const goalRoutes = require("./routes/goal.routes");
app.use("/goal", goalRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
