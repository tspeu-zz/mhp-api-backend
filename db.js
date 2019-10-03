const mongoose = require('mongoose');
const config = require('./config');
require('./route/menu.routes.js')(app); //Add route file here

const {
  db: { host, port, name }
} = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
