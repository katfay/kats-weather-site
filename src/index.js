function returnApi(value) {
  let cityName = value.data.name;
  let temperature = Math.round(value.data.main.temp);
  let mainCity = document.querySelector("#city");
  mainCity.innerHTML = cityName;
  let mainTemperature = document.querySelector("#temperature");
  mainTemperature.innerHTML = temperature;
}

function getWeather(value) {
  let userCity = value;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiCall = `${apiUrl}${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiCall).then(returnApi);
}

function searchForCity() {
  let userCity = document.querySelector("#user-city");
  userCity = userCity.value;
  getWeather(userCity);
}

let button = document.querySelector("button");
button.addEventListener("click", searchForCity);
