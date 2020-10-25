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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}
function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon
      }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}


function searchCity(city) {
  let units = "metric";
  let apiKey = "8d15c946fa212f0aa6768680f0ffd14b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
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

// celsius attempt

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
