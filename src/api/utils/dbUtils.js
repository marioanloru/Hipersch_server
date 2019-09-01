const clasificationsModel = require('../models/clasifications');
const _ = require('lodash');

module.exports = {
  //  Function to initialize db
  initialize: (docs, callback) => {
    clasificationsModel
        .insertMany(docs, (err, res) => {
          if (err) {
            console.log('Algo ha fallado');
            callback(err);
          } else {
            callback(null, res);
          }
        });
  },
  //  Function to clear db
  clearAll: (callback) => {
    clasificationsModel
      .deleteMany({})
      .exec((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
  },
  //  Function to clear db
  clearDbvVo2MAX: (callback) => {
    clasificationsModel
      .deleteMany({ aspect: 'vvo2max' })
      .exec((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
  },
  //  Function to clear db
  clearDbvUAN: (callback) => {
    clasificationsModel
      .deleteMany({ aspect: 'vuan' })
      .exec((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
  },
  //  Function to clear db
  clearDbvUAE: (callback) => {
    clasificationsModel
      .deleteMany({ aspect: 'vuae' })
      .exec((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
  },
  //  Get clasification values based on aspect
  getClasificationsBounds: (aspect, profile, gender, callback) => {
    clasificationsModel
      .find({ aspect, profile, gender })
      .exec((err, res) => {
        if (err) {
          callback(err);
        } else {
          let samples = _.sortBy(res, 'max');
          let clasificationValues = [];
          for (let i = 0; i < samples.length; i += 1) {
            if (samples[i].min !== 0) {
              clasificationValues.push(samples[i].min);
            }
            clasificationValues.push(samples[i].max);
          }
          callback(null, { aspect, samples: clasificationValues });
        }
      });
  }
}