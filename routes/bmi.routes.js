const router = require("express").Router();
const Bmi = require("../models/Bmi.model");
const { getBmiDataFromApi } = require("../utils");
const { BAD_REQUEST } = require("../utils/status.codes");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/", isAuthenticated, async (req, res) => {
  const requestBody = req.body;
  //   console.log(requestBody);
  const bmiResult = await getBmiDataFromApi(requestBody);
  //   const { data } = bmiResult;
  //   console.log("THIS IS data:", data);
  //   Bmi.create({ ...data })
  //     .then((bmi) => {
  //       console.log("THIS IS BMI", bmi);
  return res.json(bmiResult);
  //     })
  //     .catch(() => {
  //       return res.status(BAD_REQUEST);
  //     });
});

module.exports = router;
