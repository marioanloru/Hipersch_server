const clasificationsModel = require('../models/clasifications');

module.exports = {
  initialize: (docs, callback) => {
    clasificationsModel
        .insertMany(docs, (err, res) => {
          if (err) {
            console.log('Algo ha fallado');
            callback(err);
          } else {
            console.log('OKKK');
            callback(null, res);
          }
        });
  },
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
}