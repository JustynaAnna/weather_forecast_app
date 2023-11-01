require('dotenv').config();
const express = require('express');
const app = express();
const port = 5500; // Możesz dostosować port do swoich potrzeb

app.get('/', (req, res) => {
  res.send('Witaj na moim serwerze!');
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

app.get('/api-key', (req, res) => {
  const apiKey = process.env.MY_API_KEY;
  res.json({ apiKey });
});