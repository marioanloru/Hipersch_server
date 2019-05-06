const dbUtils = require('./dbUtils');
const mathUtils = require('./mathUtils');
const runningTestModel = require('../models/runningTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');
const _ = require('lodash');
const async = require('async');

function processTest(velocityLT, velocityANAT, gender, height, mainCallback) {
  const speedMS = distance/360;
  const speedKMH = speedMS * 3.6; 
  const results = {
    indexLT: 0,
    indexANAT: 0,
    anaThreshold: 0,
    lactateThreshold: 0 
  };
  async
    .parallel([
      (callback) => {
        dbUtils
          .getClasificationsBounds('efficiencylt', 'running', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('efficiencyanat', 'swimming', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('anathreshold', 'swimming', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('lactatethreshold', 'swimming', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      }
    ], (err, res) => {
      let samples = _.sortBy(res, 'max');
      let indexLTValues = _.find(res, { aspect: 'efficiencylt' });
      let indexANATValues = _.find(res, { aspect: 'efficiencyanat' });
      let anaThresholdValues = _.find(res, { aspect: 'anathreshold' });
      let lactateThresholdValues = _.find(res, { aspect: 'lactatethreshold' });


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
          //  15.3 comes from ergospirometric test
          results.vat = mathUtils.percentilRank(vuanValues.samples, 15.3) * 10;
          results.vat = Math.round(results.vat * 100)/100;
          callback(null);
        }
      ], (err, res) => {
        mainCallback(null, results);
      });
    });
}



module.exports = {
  insertTest: (req, res) => {
    const { velocityLT, velocityANAT } = req.body;
    const { userId, gender, height} = req.user;
    
    processTest(velocityLT, velocityANAT, gender, height, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('RESULTADOOO', result);
        const testToInsert = new swimmingTestModel({
          indexLT: result.indexLT,
          indexANAT: result.indexANAT,
          anaThreshold: result.anaThreshold,
          lactateThreshold: result.lactateThreshold,
          athlete: userId,
          testId: uuid4()
        });
        console.log(testToInsert);
    
        testToInsert
          .save((err, data) => {
            if (err) {
              res.status(500).json(err);
            } else {
              result.testId = testToInsert.testId;
              res.status(200).json(result);
            }
          });
      }
    });
  }
}