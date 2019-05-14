require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

console.log('Environment: ', process.env.ENVIRONMENT);
if (process.env.ENVIRONMENT === 'develop') {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MONGODB_URI + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {useNewUrlParser: true});
}

const db = mongoose.connection;

db.on('connecting', () => {
  console.log('Connecting to mongo database');
});

db.on('open', () => {
  console.log('Connected to mongo database');
});

db.on('error', (err) => {
  console.log('Error on mongo connection');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world'});
});
// api routes
app.use('/api', require('./api/routes'));
// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 9000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;