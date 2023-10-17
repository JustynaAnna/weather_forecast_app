// import config from './config.js';
document.addEventListener("DOMContentLoaded", function () {
  // const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
  // const apiKey = config.apiKey;
  const searchBox = document.querySelector('.search input');
  const searchBtn = document.querySelector('.search button');
  const weatherIcon = document.querySelector('.weather-icon');

  // An asynchronous function checking the weather for a specific city.
  async function checkWeather(city) {
    // Calling the OpenWeatherMap API and waiting for a response.
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}&cnt=4`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      const weatherData = await response.json();
      const userLocalTime = convertToUserLocalTime(weatherData);
      displayWeatherData(userLocalTime, weatherData);
      const weatherMain = weatherData.list[0].weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherMain.toLowerCase()}@2x.png`;
      weatherIcon.src = iconUrl;

      // Dodaj informacje o wschodzie i zachodzie słońca
      const { sunrise, sunset } = getSunriseAndSunset(weatherData);
      document.querySelector(".sunrise").textContent = `Sunrise: ${sunrise}`;
      document.querySelector(".sunset").textContent = `Sunset: ${sunset}`;
      displayWeatherForNextDays(weatherData);

      document.querySelector('.error').style.display = "none";
      document.querySelector('.weather').style.display = "block";
      console.log(weatherData);
    } catch (error) {
      document.querySelector('.error').textContent = `An error occured: ${error.message}`;
      document.querySelector('.error').style.display = "block";
      document.querySelector('.weather').style.display = "none";
    }
  }

  // A function converting time to the user's local time.
  function convertToUserLocalTime(weatherData) {
    const timezoneOffsetSeconds = weatherData.city.timezone;// Przesunięcie czasowe w sekundach
    // Aktualny czas serwera OpenWeatherMap (w UTC)
    const serverTimeUTC = new Date(Date.now() + timezoneOffsetSeconds * 1000);
    // Teraz możesz przeliczyć czas na lokalny czas użytkownika
    const userLocalTime = new Date(serverTimeUTC.getTime() + (new Date().getTimezoneOffset() * 60000));
    return userLocalTime;
  }

  // A function displaying current weather data.
  function displayWeatherData(userLocalTime, weatherData) {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = userLocalTime.toLocaleDateString(undefined, options);
    const hours = userLocalTime.getHours().toString().padStart(2, '0');
    const minutes = userLocalTime.getMinutes().toString().padStart(2, '0');
    document.querySelector(".current-time").textContent = `${hours}:${minutes} ${formattedDate}`;
    document.querySelector(".city").innerHTML = weatherData.city.name;

    if (weatherData.list[0]) {
      document.querySelector('.weather-description').innerHTML = weatherData.list[0].weather[0].description;
      document.querySelector('.temp').innerHTML = Math.round(weatherData.list[0].main.temp) + "°C";
      document.querySelector('.feels-like-temp').innerHTML = Math.round(weatherData.list[0].main.feels_like) + "°C";
      document.querySelector('.precipitation-chance').innerHTML = weatherData.list[0].pop + "%";
      document.querySelector('.humidity').innerHTML = weatherData.list[0].main.humidity + "%";
      document.querySelector('.wind').innerHTML = weatherData.list[0].wind.speed + " km/h";
      document.querySelector('.prresure').innerHTML = weatherData.list[0].main.pressure + " hPa";
      document.querySelector('.max-wind-speed').innerHTML = weatherData.list[0].wind.gust + " km/h";
    }
  }

  //A function for obtaining sunrise and sunset information.
  function getSunriseAndSunset(weatherData) {
    const sunriseTimestamp = weatherData.city.sunrise * 1000; // Przelicz na milisekundy
    const sunsetTimestamp = weatherData.city.sunset * 1000; // Przelicz na milisekundy

    const sunriseTime = new Date(sunriseTimestamp);
    const sunsetTime = new Date(sunsetTimestamp);

    return {
      sunrise: sunriseTime.toLocaleTimeString(),
      sunset: sunsetTime.toLocaleTimeString(),
    };
  }

  // A function displaying the forecast for the upcoming days.
  function displayWeatherForNextDays(weatherData) {
    const futureWeatherElements = document.querySelectorAll('.future-weather');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date();
    for (let i = 0; i < futureWeatherElements.length; i++) {
      const forecast = weatherData.list[i + 1];
      // Wylicz datę kolejnego dnia
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i + 1);

      // Pobierz nazwę dnia tygodnia dla tego dnia
      const dayOfWeek = daysOfWeek[nextDay.getDay()];
      const temperature = Math.round(forecast.main.temp) + "°C";
      const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
      const futureWeatherElement = futureWeatherElements[i]; // Wybierz odpowiedni pojemnik

      futureWeatherElement.querySelector('.day-of-week').textContent = dayOfWeek;
      futureWeatherElement.querySelector('.future-icon').src = icon;
      futureWeatherElement.querySelector('.future-temp').textContent = temperature;
      futureWeatherElement.querySelector('.future-weather-description').textContent = forecast.weather[0].description;
      futureWeatherElement.querySelector('.future-feels-like').innerHTML = Math.round(forecast.main.feels_like) + "°C";
      futureWeatherElement.querySelector('.future-wind').innerHTML = forecast.wind.speed + " km/h";
      futureWeatherElement.querySelector('.future-humidity').innerHTML = forecast.main.humidity + "% &nbsp;";
      futureWeatherElement.querySelector('.future-pressure').innerHTML = forecast.main.pressure + " hPa";
      futureWeatherElement.querySelector('.future-max-wind').innerHTML = forecast.wind.gust + " km/h";
    }
  }

  searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
  });

  searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkWeather(searchBox.value);
    }
  });
});
