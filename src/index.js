let now = new Date();
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `Time:${hour}:${minute}`;

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  mainTemp.innerHTML = temperature;

  let city = response.data.name;
  let cityHeading = document.querySelector("#current-city");
  cityHeading.innerHTML = city;

  let description = response.data.weather[0].description;
  let decscriptionHeading = document.querySelector("#weather-description");
  decscriptionHeading.innerHTML = description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "8d15c946fa212f0aa6768680f0ffd14b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "8d15c946fa212f0aa6768680f0ffd14b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);
let citySearch = document.querySelector("#search-city-primary");
citySearch.addEventListener("click", handleSubmit);
searchCity("Chicago");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getGeoLocation);
searchCity("London");

// celcius attempt
function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#units");
  temperatureElement.innerHTML = 27;
}
function changeToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#units");
  temperatureElement.innerHTML = 80;
}

let tempCelcius = document.querySelector("#celcius-link");
tempCelcius.addEventListener("click", changeToCelcius);

let tempFarenheit = document.querySelector("#farenheit-link");
tempFarenheit.addEventListener("click", changeToFarenheit);
