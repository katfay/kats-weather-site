function showForecast(apiResponse) {
  console.log("showForecast has been called");
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
}

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

function returnCoords(apiResponse) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  console.log("returnCoords has been called");
  let latitude = console.log(
    apiResponse.data.coord.lat
  ); /*find latitude of searched city*/
  let longitude = console.log(
    apiResponse.data.coord.long
  ); /*find longitude of searched city*/
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showSearchedCurrent() {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let userCity = document.querySelector("#searchedCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayName);
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(returnWeatherConditions);
  axios.get(apiUrl).then(returnCoords);
}

function getMorningArvo(dateResponse) {
  console.log("getMorningArvo function has been called");
  let morningArvo = document.querySelector("#ampm");
  let hour = now.getHours(dateResponse);
  if (hour <= 11) {
    morningArvo.innerHTML = "am";
  } else {
    morningArvo.innerHTML = "pm";
  }
} /* Finds am/pm value based on the hour value from the browswer current date (24 hour clock), where any hour 12 or higher is pm */

function getCurrentMinutes(dateResponse) {
  console.log("getCurrentMinute function has been called");
  let currentMinutes = now.getMinutes(dateResponse);
  console.log(currentMinutes);
  if (`${currentMinutes}`.length < 2) {
    currentMinutes = `0${currentMinutes}`;
  } /* Adds a 0 before minute value that is only one digit */
  let minutes = document.querySelector("#minutes");
  minutes.innerHTML = `.${currentMinutes}`;
}

function getCurrentHour(dateResponse) {
  console.log("getCurrentHour function has been called");
  let hours = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  let currentHour = hours[now.getHours(dateResponse)];
  console.log(currentHour);
  let hour = document.querySelector("#hour");
  hour.innerHTML = currentHour;
}

function getDayName(dateResponse) {
  console.log("getDayName function has been called");
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = dayNames[now.getDay(dateResponse)];
  console.log(dayName);
  let today = document.querySelector("#day");
  today.innerHTML = `${dayName},`;
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

let userLocation =
  navigator.geolocation.getCurrentPosition(
    findUserLocation
  ); /* Display current location and temperature information on page*/

let now = new Date();
getDayName(now); /* Display name of current day on page */
getCurrentHour(now); /* Display current time (hour) on page */
getCurrentMinutes(now); /* Display current time (minute) on page */
getMorningArvo(now); /* Display am/pm after current time on page */

let searchButton = document.querySelector("#userSearch");
searchButton.addEventListener(
  "click",
  showSearchedCurrent
); /* When user clicks search, find and display the searched city name and its current temperature on the page */
