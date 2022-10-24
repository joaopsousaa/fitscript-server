const axios = require("axios");

const { RAPID_EXERCISE_API_URL, RAPID_EXERCISE_API_KEY } = require("./consts");

const options = {
  method: "GET",
  url: RAPID_EXERCISE_API_URL,
  headers: {
    "X-RapidAPI-Key": RAPID_EXERCISE_API_KEY,
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

module.exports = { getExercisesListFromAPI };
