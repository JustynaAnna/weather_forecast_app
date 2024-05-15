import { checkWeather } from "./utils/api.js";

document.addEventListener("DOMContentLoaded", async function () {
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  let appTitle = document.querySelector(".app-title").style;

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
    hideTitle(appTitle);
  });

  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkWeather(searchBox.value.trim());
      hideTitle(appTitle);
    }
  });
});

function hideTitle(appTitle) {
  appTitle.display = "none";
}
