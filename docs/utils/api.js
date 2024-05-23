import { convertToUserLocalTime } from "./convertToUserLocalTime.js";
import { displayWeatherData } from "./displayWeatherData.js";
import { getSunriseAndSunset } from "./getSunriseAndSunset.js";
import { displayWeatherForNextDays } from "./futureWeatherData.js";

// An asynchronous function checking the weather for a specific city.
export async function checkWeather(city) {
  console.log("checkWeather function called with city:", city);
  const weatherIcon = document.querySelector(".weather-icon");
  let weather = document.querySelector(".weather").style;
  let error = document.querySelector(".error");
  let futureSection = document.querySelector(".future-weather-section").style;
  let appTitle = document.querySelector(".app-title").style; // Dodaj pobieranie elementu app-title
  const baseUrl = "https://weather-forecast-app-lemon-one.vercel.app/";
  // Calling the OpenWeatherMap API and waiting for a response.
  try {
    // const response = await fetch(`http://localhost:3000/weather/${city}`);
    const response = await fetch(`${baseUrl}/weather/${city}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(` Error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    const weatherData = responseData.weatherData;
    // const weatherData = await response.json();
    console.log("Received weather data:", weatherData);
    const userLocalTime = convertToUserLocalTime(weatherData);
    console.log(userLocalTime);
    displayWeatherData(userLocalTime, weatherData);
    const weatherMain = weatherData.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherMain.toLowerCase()}@2x.png`;
    weatherIcon.src = iconUrl;

    // Add Sunrise and Sunset Information
    const { sunrise, sunset } = getSunriseAndSunset(weatherData);
    document.querySelector(".sunrise").textContent = `Sunrise: ${sunrise}`;
    document.querySelector(".sunset").textContent = `Sunset: ${sunset}`;
    displayWeatherForNextDays(weatherData);

    error.style.display = "none";
    weather.display = "block";
    futureSection.display = "block";
    document.querySelector(".app-title").style.display = "none";
    appTitle.display = "none";
    console.log(weatherData);
  } catch (exception) {
    error.textContent = `An error occured: ${exception.message} `;
    console.log(exception);
    error.style.display = "block";
    weather.display = "none";
    futureSection.display = "none";
  }
}
