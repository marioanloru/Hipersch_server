const initializeUtils = require('./utils');
const mongoose = require('mongoose');
const async = require('async');

mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to mongodb');
});

db.on('error', console.error.bind(console, 'connection error:'));

async
  .parallel([
    (callback) => {
      initializeUtils.initializeRunningTable((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    },
    (callback) => {
      initializeUtils.initializeCyclingTable((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    },
    (callback) => {
      initializeUtils.initializeCyclingPeakTable((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    },
    (callback) => {
      initializeUtils.initializeSwimmingTable((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    }
  ], (err, res) => {
    mongoose.disconnect();
  });


//initializeUtils.initializeSwimmingTable();
//initializeUtils.initializeCyclismTable();


