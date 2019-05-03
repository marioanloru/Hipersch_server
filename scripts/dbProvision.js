const initializeUtils = require('./utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to mongodb');
});

db.on('error', console.error.bind(console, 'connection error:'));

initializeUtils.initializeRunningTable((err, res) => {
  mongoose.disconnect();
});

//initializeUtils.initializeSwimmingTable();
//initializeUtils.initializeCyclismTable();


