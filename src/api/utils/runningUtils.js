const dbUtils = require('./dbUtils');
const mathUtils = require('./mathUtils');
const runningTestModel = require('../models/runningTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');
const _ = require('lodash');
const async = require('async');

function processSixMinutesTest(distance, gender, vo2maxIndirect, mainCallback) {
  const speedMS = distance/360;
  const speedKMH = speedMS * 3.6; 
  const results = {
    speed: speedKMH,
    'MAVvVo2max': 0,
    'vo2max': 0,
    'vat': 0 
  };
  /** */
  async
    .parallel([
      (callback) => {
        dbUtils
          .getClasificationsBounds('vvo2max', 'running', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('vo2max', 'running', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('vuan', 'running', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      }
    ], (err, res) => {
      let samples = _.sortBy(res, 'max');
      let mavValues = _.find(res, { aspect: 'vvo2max' });
      let vo2Values = _.find(res, { aspect: 'vo2max' });
      let vuanValues = _.find(res, { aspect: 'vuan' });

      async.waterfall([
        (callback) => {
          results.MAVvVo2max = mathUtils.percentilRank(mavValues.samples, speedKMH) * 10;
          results.MAVvVo2max = Math.round(results.MAVvVo2max * 100)/100;
          callback(null);
        },
        (callback) => {
          results.vo2max = mathUtils.percentilRank(vo2Values.samples, vo2maxIndirect) * 10;
          results.vo2max = Math.round(results.vo2max * 100)/100;
          callback(null);
        },
        (callback) => {
          results.vat = mathUtils.percentilRank(vuanValues.samples, process.env.UAN) * 10;
          results.vat = Math.round(results.vat * 100)/100;
          callback(null);
        }
      ], (err, res) => {
        mainCallback(null, results);
      });
    });
}



module.exports = {
  insertTestSixMinutes: (req, res) => {
    const { distance } = req.body;
    const { userId, gender} = req.user;
    
    let result = processSixMinutesTest(distance, gender, 45.1, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const testToInsert = new runningTestModel({
          distance,
          speed: result.speed,
          athlete: userId,
          testId: uuid4()
        });
        console.log(testToInsert);
    
        testToInsert
          .save((err, data) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(result);
            }
          });
      }
    });
  },
  getUserTests: (req, res) => {
    const { userId } = req.user;
    runningTestModel
      .find({ athlete: userId })
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  },
  getUserTestsByDate: (req, res) => {
    //  Setear busqueda por intervalo de fecha (entre fechas)
    const { userId } = req.user;
    const { max, min } = req.params;
    runningTestModel
      .find(user)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  }

}