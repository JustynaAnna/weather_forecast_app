// A function converting time to the user's local time.
export function convertToUserLocalTime(weatherData) {
  console.log(weatherData);
  // const timezoneOffsetSeconds = weatherData.city.timezone; // Przesunięcie czasowe w sekundach
  const timezoneOffsetSeconds = weatherData.city.timezone;

  // Aktualny czas serwera OpenWeatherMap (w UTC)
  const serverTimeUTC = new Date(Date.now() + timezoneOffsetSeconds * 1000);
  // Teraz mogę przeliczyć czas na lokalny czas użytkownika
  const userLocalTime = new Date(
    serverTimeUTC.getTime() + new Date().getTimezoneOffset() * 60000
  );
  return userLocalTime;
}
