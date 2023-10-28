 // A function displaying current weather data.
 export function displayWeatherData(userLocalTime, weatherData) {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = userLocalTime.toLocaleDateString('en-US', options);
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