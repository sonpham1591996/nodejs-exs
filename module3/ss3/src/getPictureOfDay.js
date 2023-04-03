const axios = require("axios");

const API_KEY = "uSXGfdK1DiiWRx4TRICRo16buJxAyZYJbvlEUaWQ";

axios
  .get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => console.err(error));
