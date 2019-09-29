const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const serverPort = config.app.port;
const {
  db: { host, port, name }
} = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

// Get the API routes
const router = express.Router();
// Get the API route ...
require('./routes/parking.routes.js');
const api = require('./routes/api.routes');

const app = express();

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

app.use('/api', api);

router.get('/', function(req, res) {
  res.json({ error: false, message: 'Hello World' });
});

app.use('/api', router);
console.log('APP running JO!');
//Add route file here

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

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api parking jmb' });
});

app.listen(config.app.port, () => {
  console.log('Server is up and running on port : ' + serverPort);
});
