//get last update time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturtday",
  ];
  let day = days[now.getDay()];
  let month = String(now.getMonth() + 1).padStart(2, "0");
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}, ${date}/${month}/${year} at ${hour}:${minutes}`;
}
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
//update weather data
function displayWeather(response) {
  celsiusTemp = response.data.main.temp;
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
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
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

//unit conversion
let celsiusTemp = null;

function displayFahrenheit(event) {
  event.preventDefault();
  //remove active class for celsius link
  celsius.classList.remove("active");
  celsius.classList.add("inactive");
  fahrenheit.classList.remove("inactive");
  fahrenheit.classList.add("active");

  let currentTemp = document.querySelector("#current-temp-number");

  currentTemp.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();

  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");
  celsius.classList.remove("inactive");
  celsius.classList.add("active");
  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);

//default city
searchDefaultCity("Lisbon");
