// TODO: Import express
const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");


// TODO: Import 'terms.json' file
const PORT = 3001;
const terms = JSON.parse(fs.readFileSync('./terms.json', 'utf8'));


// TODO: Initialize app variable
app.get('/api/', (req, res) => {
  res.json(terms);
});

// TODO: Create a route for a GET request that will return the content of our `terms.json` file

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'terms.json'));
}
);

