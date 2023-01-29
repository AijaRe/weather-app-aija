//get API by city
function updateWeatherByCity(city) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather, function () {
    alert("Try entering a valid city name! 🌍");
  });
}
//city search
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  updateWeatherByCity(searchInput);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);
//default city
function searchDefaultCity(city) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
//update current city and temperature
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  document.querySelector("#current-location").innerHTML = city;
  document.querySelector("#current-temp-number").innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  console.log(response.data);
}
//get geolocation
function getCoordinateWeather() {
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    {
      axios.get(apiUrl).then(displayWeather);
    }
  }
  navigator.geolocation.getCurrentPosition(getPosition);
}
let geolocationButton = document.querySelector("#geolocation-btn");
geolocationButton.addEventListener("click", getCoordinateWeather);

searchDefaultCity("Lisbon");
