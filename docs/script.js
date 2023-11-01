import {checkWeather} from './utils/api.js';

document.addEventListener("DOMContentLoaded", async function () {
  const searchBox = document.querySelector('.search input');
  const searchBtn = document.querySelector('.search button');
  // const response = await fetch('http://localhost:5500/api/api-key');
  // const data = await response.json();
  // const apiKey = process.env;

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