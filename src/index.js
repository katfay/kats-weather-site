function getWindConditions(apiResponse) {
  let windDescription = document.querySelector("#wind-speed");
  let windResult = apiResponse.data.wind.speed;
  if (windResult <= 3) {
    windDescription.innerHTML = "not windy";
  } else {
    if (windResult > 3 && windResult <= 10.5) {
      windDescription.innerHTML = "fresh breeze";
    } else {
      if (windResult > 10.5 && windResult <= 16.5) {
        windDescription.innerHTML = "windy";
      } else {
        if (windResult > 16.5) {
          windDescription.innerHTML = "strong or gale force winds";
        }
      }
    }
  }
}

function returnWeatherConditions(apiResponse) {
  console.log("returnWeatherConditions has been called");
  console.log(apiResponse);
  let descriptionResponse = apiResponse.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = descriptionResponse;
  let feelsLikeResponse = apiResponse.data.main.feels_like;
  let feelsLike = document.querySelector("#weather-feels");
  feelsLikeResponse = Math.round(feelsLikeResponse);
  feelsLikeResponse = `feels like ${feelsLikeResponse}°c`;
  feelsLike.innerHTML = feelsLikeResponse;
  getWindConditions(apiResponse);
}

function displayTemperature(apiResponse) {
  let temperatureElement = document.querySelector("#searched-temperature");
  temperatureElement.innerHTML = Math.round(apiResponse.data.main.temp);
  let units = document.querySelector("#units");
  units.innerHTML = "°C";
  returnWeatherConditions(apiResponse);
}

function displayName(apiResponse) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = apiResponse.data.name;
  displayTemperature(apiResponse);
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
  if (weatherIdResponse >= 300 && weatherIdResponse <= 321) {
    weatherPhoto.style = `background-image: url(${rainPic});`;
  }
  if (weatherIdResponse >= 500 && weatherIdResponse <= 531) {
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

function showSearchedCurrent() {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let userCity = document.querySelector("#searchedCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherPhoto);
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
  currentMinutes = `${currentMinutes}`; /* Updates the currentMinutes variable's data type to a string */
  if (currentMinutes.length < 2) {
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

function getWeatherIcon(apiResponse) {
  console.log(apiResponse.data);
  let weatherIcon = document.getElementById("geo-weather-icon");
  let weatherDescription = apiResponse.data.weather[0].id;
  weatherIcon.className = "fa-solid fa-cloud";
}

function showGeoTemperature(apiResponse) {
  let geoTemperatureResult = Math.round(apiResponse.data.main.temp);
  console.log(geoTemperatureResult);
  let temperatureHere = document.querySelector("#temperature-here");
  temperatureHere.innerHTML = geoTemperatureResult;
  getWeatherIcon(apiResponse);
}

function showGeoCity(apiResponse) {
  let geoCityResult = apiResponse.data.name;
  let currentPlace = document.querySelector("#here");
  currentPlace.innerHTML = geoCityResult;
  showGeoTemperature(apiResponse);
}

function showUserLocation(geoLatitude, geoLongitude) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLatitude}&lon=${geoLongitude}&appid=${apiKey}&units=metric`;
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
