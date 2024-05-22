import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
// import path from "path"; // Dodana importacja modułu path
dotenv.config();

const app = express();
app.use(express.static("docs"));
const PORT = process.env.PORT || 3000;
console.log("Starting server...");
app.use(cors());

// app.get("/", (req, res) => {
//   console.log("Redirecting to /docs/public");
//   res.redirect("/docs/public");
// });

// Obsługa endpointu /weather/:city
app.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.SECRET_API_KEY;
  const apiUrl = process.env.API_BASE_URL;
  const requestUrl = `${apiUrl}${city}&appid=${apiKey}&cnt=4`;

  try {
    console.log(`Fetching data from: ${requestUrl}`);
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const weatherData = await response.json();
    res.json({ weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Uruchamianie serwera na podanym porcie
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
