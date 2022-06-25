function returnWeatherConditions(apiResponse) {
  console.log("returnWeatherConditions has been called");
  console.log(apiResponse.data.weather[0].description);
}

function displayTemperature(apiResponse) {
  let temperatureElement = document.querySelector("#searched-temperature");
  temperatureElement.innerHTML = Math.round(apiResponse.data.main.temp);
  let units = document.querySelector("#units");
  units.innerHTML = "°C";
}

function displayName(apiResponse) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = apiResponse.data.name;
}

function showSearchedCurrent() {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let userCity = document.querySelector("#searchedCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayName);
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(returnWeatherConditions);
}

function showGeoCity(apiResponse) {
  console.log("showGeoCity has been called");
  let geoCityResult = apiResponse.data.name;
  console.log(geoCityResult);
  let currentPlace = document.querySelector("#here");
  currentPlace.innerHTML = geoCityResult;
}

function showGeoTemperature(apiResponse) {
  console.log("showGeoTemperature has been called");
  let geoTemperatureResult = Math.round(apiResponse.data.main.temp);
  console.log(geoTemperatureResult);
  let temperatureHere = document.querySelector("#temperature-here");
  temperatureHere.innerHTML = geoTemperatureResult;
}

function showUserLocation(geoLatitude, geoLongitude) {
  console.log(geoLatitude);
  console.log(geoLongitude);
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLatitude}&lon=${geoLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(showGeoTemperature);
  axios.get(apiGeoUrl).then(showGeoCity);
}

function findUserLocation(browserResponse) {
  let geoLatitude = browserResponse.coords.latitude;
  let geoLongitude = browserResponse.coords.longitude;
  showUserLocation(geoLatitude, geoLongitude);
}

let userLocation = navigator.geolocation.getCurrentPosition(findUserLocation);

let searchButton = document.querySelector("#userSearch");
searchButton.addEventListener("click", showSearchedCurrent);
