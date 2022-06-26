function showForecast(apiResponse) {
  console.log("showForecast has been called");
  console.table(apiResponse.data);
}

function returnCoords(apiResponse) {
  console.log("returnCoords has been called");
  console.table(apiResponse.data);
  let latitude =
    apiResponse.data.coord
      .lat; /* Access and assign variable name to latitude of searched city*/
  let longitude =
    apiResponse.data.coord
      .lon; /* Access and assign variable name to longitude of searched city*/
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}lon=${longitude}&appid=${apiKey}`; /* Set API call address to call a 6 day forecast from the API, based on the latitude and longitude of the searched city */
  axios.get(apiUrl).then(showForecast);
}
