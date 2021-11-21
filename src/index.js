let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function city(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
}

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temp = document.querySelector(".mit");
  temp.innerHTML = `${temperature} °C`;
  let wet = document.querySelector(".ohne");
  wet.innerHTML = response.data.weather[0].main;
  let humi = document.querySelector("#humi");
  let wind = document.querySelector("#wind");
  let humidity = Math.round(response.data.main.humidity);
  let winds = Math.round(response.data.wind.speed);
  humi.innerHTML = `Humidity: ${humidity} %`;
  wind.innerHTML = `Wind: ${winds} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "98b36d0829d6e91f19ba540afdc162ac";
  let units = "metric";
  let cityName = document.querySelector("#input");
  let searchInput = cityName.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=98b36d0829d6e91f19ba540afdc162ac`;
  axios.get(apiUrlL).then(showWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#curent");
button.addEventListener("click", getLocation);

let buttons = document.querySelector("#search");
buttons.addEventListener("click", searchCity);
