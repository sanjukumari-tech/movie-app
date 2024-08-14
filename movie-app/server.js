const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const router = require('./routes/movieRoutes');
const ensureTable = require('./middlewares/ensureTable');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4545;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send("this is home route");
});

// Use the ensureTable middleware and the router for /api routes
app.use("/api", ensureTable, router);

// Start the server and connect to the database
app.listen(port, async () => {
  try {
    await connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('we are successfully connected to the database');
      }
    });
    console.log(`server is running at http://localhost:${port}`);
  } catch (err) {
    console.log(err);
    console.log('we got an error while connecting to the database');
  }
});
