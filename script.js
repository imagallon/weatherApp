var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var forecastResult = document.querySelector("#forecastResult");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var cityName = document.querySelector("#city-name");
var cityButton = document.querySelector(".city");
var appendButton = document.querySelector(".button-append");

function searchFormSubmit(event) {
  event.preventDefault();

  if (!searchInput) {
    alert("please enter a city name");
    return;
  }
  console.log(searchInput);
}

var apiKey = "ffb0f27f089ab30a4b2b5ef92891585b";

searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  var city = searchInput.value;
  cityName.textContent = city;

  if (city === "") {
    return;
  }
  console.log(city);
  fetchCityWeather(city);
  createCityButton(city);
  storeSearchInput(city);
  // fetchWeatherForecast();
});

cityButton.addEventListener("click", function () {
  var city = cityButton.getAttribute("data-city");

  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  fetch(queryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);

      temp.textContent = data.main.temp + "°";
      wind.textContent = data.wind.speed + " mph";
      humidity.textContent = data.main.humidity + " %";
    });
});

function createCityButton(searchInput) {
  //var city = searchInput.value;
  var searchResultButton = document.createElement("button");

  searchResultButton.classList.add(
    "city",
    "btn",
    "btn-outline-primary",
    "btn-block"
  );

  searchResultButton.setAttribute("data-city", searchInput);
  searchResultButton.textContent = searchInput;
  console.log(searchInput);

  appendButton.appendChild(searchResultButton);
}

function storeSearchInput(city) {
  var cityNames = JSON.parse(localStorage.getItem("cityNames", []))
  // cityNames.push(city)
  localStorage.setItem("cityNames", JSON.stringify(city));
  

}

function fetchCityWeather(city) {
  var city = document.querySelector("#search-input").value;

  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  fetch(queryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);

      temp.textContent = data.main.temp + "°";
      wind.textContent = data.wind.speed + " mph";
      humidity.textContent = data.main.humidity + " %";
    });
}

function fetchWeatherForecast() {
  var city = searchInput.value;
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(queryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      forecastResult.append(data)
    });
}
