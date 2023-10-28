 //A function for obtaining sunrise and sunset information.
 export function getSunriseAndSunset(weatherData) {
    const sunriseTimestamp = weatherData.city.sunrise * 1000; // Przelicza na milisekundy
    const sunsetTimestamp = weatherData.city.sunset * 1000; 

    const sunriseTime = new Date(sunriseTimestamp);
    const sunsetTime = new Date(sunsetTimestamp);

    return {
      sunrise: sunriseTime.toLocaleTimeString(),
      sunset: sunsetTime.toLocaleTimeString(),
    };
  }