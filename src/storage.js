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

function showWeatherPhoto(apiResponse) {
  console.log("showWeatherPhoto function has been called");
  let weatherIdResponse = apiResponse.data.weather[0].id;
  let cloudyPic = "https://bit.ly/3bnQ161";
  let cloudAndSkyPic = "https://bit.ly/3HVRb56";
  let fewCloudsPic = "https://bit.ly/3bwvcVS";
  let clearSkyPic = "https://bit.ly/3NmlvXq";
  let snowPic = "https://bit.ly/39QArPS";
  let thunderstormPic = "https://bit.ly/3xY0v3t";
  let rainPic = "https://bit.ly/3Noron3";
  let hazyPic = "https://bit.ly/3I7Zued";
  let weatherPhoto = document.getElementById("weather-photo");
  if (weatherIdResponse >= 200 && weatherIdResponse <= 232) {
    weatherPhoto.style = `background-image: url(${thunderstormPic});`;
  }
  if (
    (weatherIdResponse >= 300 && weatherIdResponse <= 321) ||
    (weatherIdResponse >= 500 && weatherIdResponse <= 531)
  ) {
    weatherPhoto.style = `background-image: url(${rainPic});`;
  }
  if (weatherIdResponse >= 600 && weatherIdResponse <= 622) {
    weatherPhoto.style = `background-image: url(${snowPic});`;
  }
  if (weatherIdResponse === 800) {
    weatherPhoto.style = `background-image: url(${clearSkyPic});`;
  }
  if (weatherIdResponse === 801) {
    weatherPhoto.style = `background-image: url(${fewCloudsPic});`;
  }
  if (weatherIdResponse === 802 || weatherIdResponse === 803) {
    weatherPhoto.style = `background-image: url(${cloudAndSkyPic});`;
  }
  if (weatherIdResponse === 804) {
    weatherPhoto.style = `background-image: url(${cloudyPic});`;
  }
  if (weatherIdResponse >= 701 && weatherIdResponse <= 781) {
    weatherPhoto.style = `background-image: url(${hazyPic});`;
  }
  displayName(apiResponse);
}
