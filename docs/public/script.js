import { checkWeather } from "./utils/api.js";

document.addEventListener("DOMContentLoaded", async function () {
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  let appTitle = document.querySelector(".app-title").style;

  searchBtn.addEventListener("click", () => {
    console.log("Search button clicked");
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
// document.querySelector("button").addEventListener("click", async () => {
//   const city = document.querySelector("input[name='city']").value;
//   try {
//     const response = await fetch(`http://localhost:3000/weather/${city}`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//   } catch (error) {
//     console.log("There was a problem with your fetch operation: ", error);
//   }
// });
