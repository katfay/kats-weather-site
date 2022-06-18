function displayName(apiResponse) {
  console.log(apiResponse.data.name);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = apiResponse.data.name;
}

function displayTemperature(apiResponse) {
  console.log(apiResponse.data.main.temp);

  let temperatureElement = document.querySelector("#searched-temperature");
  temperatureElement.innerHTML = apiResponse.data.main.temp;
  let units = document.querySelector("#units");
  units.innerHTML = "°C";
}

let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayName);
axios.get(apiUrl).then(displayTemperature);
