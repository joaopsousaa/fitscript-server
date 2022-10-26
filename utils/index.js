const axios = require("axios");

const { RAPID_EXERCISE_API_URL } = require("./consts");

const options = {
  method: "GET",
  url: RAPID_EXERCISE_API_URL,
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_EXERCISE_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

async function getExercisesListFromAPI() {
  try {
    const response = await axios.request(options);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getBmiDataFromApi(form) {
  const options = {
    method: "GET",
    url: "https://fitness-calculator.p.rapidapi.com/bmi",
    params: {
      age: `${form.age}`,
      weight: `${form.weight}`,
      height: `${form.height}`,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_BMI_API_KEY,
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
    },
  };

  try {
    const bmiResponse = await axios.request(options);
    const bmiData = await bmiResponse.data;
    // console.log("this is bmi data", bmiData);
    return bmiData;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getExercisesListFromAPI, getBmiDataFromApi };
