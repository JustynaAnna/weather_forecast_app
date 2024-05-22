// A function displaying the forecast for the upcoming days.
export function displayWeatherForNextDays(weatherData) {
  const futureWeatherElements = document.querySelectorAll(".future-weather");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

    futureWeatherElement.querySelector(".day-of-week").textContent = dayOfWeek;
    futureWeatherElement.querySelector(".future-icon").src = icon;
    futureWeatherElement.querySelector(".future-temp").textContent =
      temperature;
    futureWeatherElement.querySelector(
      ".future-weather-description"
    ).textContent = forecast.weather[0].description;
    futureWeatherElement.querySelector(".future-feels-like").innerHTML =
      Math.round(forecast.main.feels_like) + "°C";
    futureWeatherElement.querySelector(".future-wind").innerHTML =
      forecast.wind.speed + " km/h";
    futureWeatherElement.querySelector(".future-humidity").innerHTML =
      forecast.main.humidity + "% &nbsp;";
    futureWeatherElement.querySelector(".future-pressure").innerHTML =
      forecast.main.pressure + " hPa";
    futureWeatherElement.querySelector(".future-max-wind").innerHTML =
      forecast.wind.gust + " km/h";
  }
}
