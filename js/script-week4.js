//city search
function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = searchInput.value;
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", changeCity);

//current date and time format
function formatDate() {
  let now = new Date();
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
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(new Date());
//convert to fahrenheit
function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp-number");
  let temperature = currentTemp.innerHTML;
  temperature = Number(temperature);
  currentTemp.innerHTML = Math.round(temperature * 1.8 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit);
//convert to celsius
function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp-number");
  let temperature = currentTemp.innerHTML;
  temperature = Number(temperature);
  currentTemp.innerHTML = `16`;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);
