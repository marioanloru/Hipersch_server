require('dotenv').config();
const initializeUtils = require('./utils');
const mongoose = require('mongoose');
const async = require('async');

if (process.env.ENVIRONMENT === 'develop') {
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
} else {
  mongoose.connect(process.env.MONGODB_URI + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {useNewUrlParser: true});
}
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


