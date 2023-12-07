const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware untuk meng-handle JSON data
app.use(bodyParser.json());

// Import router dari studentController.js
const studentRouter = require('./controllers/studentController');
app.use('/mahasiswa', studentRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Handle error 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Handle error 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
