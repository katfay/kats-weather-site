function showSearchedCurrent() {
  console.log("click is working");
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayName);
  console.log("search city name API call is working");
  axios.get(apiUrl).then(displayTemperature);
  console.log("search city current temp API call is working");
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

let searchButton = document.querySelector("#userSearch");
searchButton.addEventListener("click", showSearchedCurrent);
