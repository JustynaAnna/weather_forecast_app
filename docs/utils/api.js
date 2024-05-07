import { convertToUserLocalTime } from "./convertToUserLocalTime.js";
import { displayWeatherData } from "./displayWeatherData.js";
import { getSunriseAndSunset } from "./getSunriseAndSunset.js";
import { displayWeatherForNextDays } from "./futureWeatherData.js";

// An asynchronous function checking the weather for a specific city.
export async function checkWeather(city) {
  // const apiKey = process.env.MY_API_KEY;
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
  const weatherIcon = document.querySelector(".weather-icon");
  let weather = document.querySelector(".weather").style;
  let error = document.querySelector(".error");
  let futureSection = document.querySelector(".future-weather-section").style;
  // let title = document.querySelector('.app-title');
  let appTitle = document.querySelector(".app-title").style; // Dodaj pobieranie elementu app-title

  // Calling the OpenWeatherMap API and waiting for a response.
  try {
    const response = await fetch(apiUrl + city);
    console.log(response);
    if (!response.ok) {
      throw new Error(` Error! Status: ${response.status}`);
    }
    const weatherData = await response.json();
    const userLocalTime = convertToUserLocalTime(weatherData);
    displayWeatherData(userLocalTime, weatherData);
    const weatherMain = weatherData.list[0].weather[0].icon;
    const iconUrl = `https://opnweathermap.org/img/wn/${weatherMain.toLowerCase()}@2x.png`;
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
    error.style.display = "block";
    weather.display = "none";
    futureSection.display = "none";
  }
}
