const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const logger = require('morgan');
const http = require('http');
const https = require('https');

const router = express.Router();
// Get the API route ...
require('./routes/parking.routes.js');
const api = require('./routes/api.routes');

const app = express();

const serverPort = config.app.port;

const {
  db: { host, port, name }
} = config;

const connectionString = `mongodb://${host}:${port}/${name}`;

// Connecting to the database
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected  to the mongodb! JO');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
};
// Get the API routes
app.options('*', cors(corsOptions));
// parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

app.use('/api', api);
app.use('/api', router);

router.get('/', function(req, res) {
  res.json({ error: false, message: 'Hello World' });
});

//Add route file here

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api parking jmb' });
});

app.listen(config.app.port, () => {
  console.log('Server is up and running on port : ' + serverPort);
});
console.log('APP running!');
