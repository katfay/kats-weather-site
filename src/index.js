function formatDayName(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function formatWeatherCode(weatherCode) {
  if (weatherCode >= 200 && weatherCode <= 232) {
    return `<i class="fa-solid fa-cloud-bolt h4"></i>`;
  }
  if (
    (weatherCode >= 300 && weatherCode <= 321) ||
    (weatherCode >= 500 && weatherCode <= 531)
  ) {
    return `<i class="fa-solid fa-cloud-rain h4"></i>`;
  }
  if (weatherCode >= 600 && weatherCode <= 622) {
    return `<i class="fa-solid fa-snowflake h4"></i>`;
  }
  if (weatherCode === 800) {
    return `<i class="fa-solid fa-sun h4"></i>`;
  }
  if (weatherCode >= 801 && weatherCode <= 803) {
    return `<i class="fa-solid fa-cloud-sun h4"></i>`;
  }
  if (weatherCode === 804) {
    return `<i class="fa-solid fa-cloud h4"></i>`;
  }
  if (weatherCode >= 701 && weatherCode <= 781) {
    return `<i class="fa-solid fa-wind h4"></i>`;
  }
}

function showForecast(apiResponse) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul>`;
  let forecastData = apiResponse.data.daily;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <li>
      <span class="weather-icon"
        >${formatWeatherCode(forecastDay.weather[0].id)}</span
      ><span class="day-name">${formatDayName(forecastDay.dt)}</span
      ><span class="forecast">${Math.round(forecastDay.temp.min)}</span
      >
      <span class="forecast">—</span
      >
      <span class="forecast">${Math.round(forecastDay.temp.max)}°C</span
      >
    </li>
    `;
    }
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function getSearchedCoords(apiResponse) {
  let latitude = apiResponse.data.coord.lat;
  let longitude = apiResponse.data.coord.lon;
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(showForecast);
}

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
  getSearchedCoords(apiResponse);
}

function returnWeatherConditions(apiResponse) {
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

function showCloudy() {
  let cloudyPic = "https://bit.ly/3bnQ161";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${cloudyPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Daoudi Aissa";
  artist.href = "https://unsplash.com/@dannyeve";
}

function showCloudAndSky() {
  let cloudAndSkyPic = "https://bit.ly/3HVRb56";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${cloudAndSkyPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Inderpreet Sekhon";
  artist.href = "https://unsplash.com/@inderpreetsekhon";
}

function showFewClouds() {
  let fewCloudsPic = "https://bit.ly/3bwvcVS";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${fewCloudsPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Gilbert Nathaniel Salim";
  artist.href = "https://unsplash.com/es/@itsoonz";
}

function showClearSky() {
  let clearSkyPic = "https://bit.ly/3NmlvXq";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${clearSkyPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Grooveland Designs";
  artist.href = "https://unsplash.com/@groovelanddesigns";
}

function showSnow() {
  let snowPic = "https://bit.ly/39QArPS";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${snowPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Nathan Fertig";
  artist.href = "https://unsplash.com/@nathanfertig";
}

function showRain() {
  let rainPic = "https://bit.ly/3Noron3";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${rainPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Valentin Müller";
  artist.href = "https://unsplash.com/@wackeltin_meem";
}

function showThunderstorm() {
  let thunderstormPic = "https://bit.ly/3xY0v3t";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${thunderstormPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Felix Mittermeier";
  artist.href = "https://unsplash.com/@felix_mittermeier";
}

function showHazy() {
  let hazyPic = "https://bit.ly/3I7Zued";
  let weatherPhoto = document.getElementById("weather-photo");
  weatherPhoto.style = `background-image: url(${hazyPic});`;
  let artist = document.getElementById("artist-name");
  artist.innerHTML = "Ivan Torres";
  artist.href = "https://unsplash.com/@iavnt";
}

function chooseWeatherPic(apiResponse) {
  let weatherIdResponse = apiResponse.data.weather[0].id;
  if (weatherIdResponse >= 200 && weatherIdResponse <= 232) {
    showThunderstorm();
  }
  if (
    (weatherIdResponse >= 300 && weatherIdResponse <= 321) ||
    (weatherIdResponse >= 500 && weatherIdResponse <= 531)
  ) {
    showRain();
  }
  if (weatherIdResponse >= 600 && weatherIdResponse <= 622) {
    showSnow();
  }
  if (weatherIdResponse === 800) {
    showClearSky();
  }
  if (weatherIdResponse === 801) {
    showFewClouds();
  }
  if (weatherIdResponse === 802 || weatherIdResponse === 803) {
    showCloudAndSky();
  }
  if (weatherIdResponse === 804) {
    showCloudy();
  }
  if (weatherIdResponse >= 701 && weatherIdResponse <= 781) {
    showHazy();
  }
  displayName(apiResponse);
}

function showSearchedCurrent() {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let userCity = document.querySelector("#searchedCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(chooseWeatherPic);
}

function getMorningArvo(dateResponse) {
  let morningArvo = document.querySelector("#ampm");
  let hour = now.getHours(dateResponse);
  if (hour <= 11) {
    morningArvo.innerHTML = "am";
  } else {
    morningArvo.innerHTML = "pm";
  }
} /* Finds am/pm value based on the hour value from the browswer current date (24 hour clock), where any hour 12 or higher is pm */

function getCurrentMinutes(dateResponse) {
  let currentMinutes = now.getMinutes(dateResponse);
  currentMinutes = `${currentMinutes}`; /* Updates the currentMinutes variable's data type to a string */
  if (currentMinutes.length < 2) {
    currentMinutes = `0${currentMinutes}`;
  } /* Adds a 0 before minute value that is only one digit */
  let minutes = document.querySelector("#minutes");
  minutes.innerHTML = `.${currentMinutes}`;
}

function getCurrentHour(dateResponse) {
  let hours = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  let currentHour = hours[now.getHours(dateResponse)];
  let hour = document.querySelector("#hour");
  hour.innerHTML = currentHour;
}

function getDayName(dateResponse) {
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
  let today = document.querySelector("#day");
  today.innerHTML = `${dayName},`;
}

function getWeatherIcon(apiResponse) {
  let weatherIcon = document.getElementById("geo-weather-icon");
  let weatherDescription = apiResponse.data.weather[0].id;
  weatherIcon.className = "fa-solid fa-cloud";
}

function showGeoTemperature(apiResponse) {
  let geoTemperatureResult = Math.round(apiResponse.data.main.temp);
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
