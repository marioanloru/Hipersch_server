require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

if (process.env.ENVIRONMENT === 'develop') {
  console.log(process.env.MONGODB_URI);
} else {
  mongoose.connect(process.env.MONGODB_URI + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {useNewUrlParser: true});
}

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to DB');
});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
//app.use('/api', require('./api/api.controller'));
app.use('/api', require('./api/routes'));
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 9000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;