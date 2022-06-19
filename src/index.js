function showSearchedCurrent() {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let userCity = document.querySelector("#searchedCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayName);
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(returnWeatherConditions);
}

function displayName(apiResponse) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = apiResponse.data.name;
}

function displayTemperature(apiResponse) {
  let temperatureElement = document.querySelector("#searched-temperature");
  temperatureElement.innerHTML = Math.round(apiResponse.data.main.temp);
  let units = document.querySelector("#units");
  units.innerHTML = "°C";
}

function returnWeatherConditions(apiResponse) {
  console.log("returnWeatherConditions has been called");
  console.log(apiResponse.data.weather[0].description);
}

function findUserLocation(browserResponse) {
  console.log(browserResponse);
  let geoLatitude = browserResponse.coords.latitude;
  console.log(geoLatitude);
  let geoLongitude = browserResponse.coords.longitude;
  console.log(geoLongitude);
}

function showUserLocation() {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLatitude}&lon=${geoLongitude}&appid=${apiKey}&units=metric`;
}

let searchButton = document.querySelector("#userSearch");
searchButton.addEventListener("click", showSearchedCurrent);

let userLocation = navigator.geolocation.getCurrentPosition(findUserLocation);
