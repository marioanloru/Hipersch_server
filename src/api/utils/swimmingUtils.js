const dbUtils = require('./dbUtils');
const mathUtils = require('./mathUtils');
const swimmingTestModel = require('../models/swimmingTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');
const _ = require('lodash');
const async = require('async');

function processTest(velocityLT, velocityANAT, gender, height, mainCallback) {
  const distance = 200;

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
          .getClasificationsBounds('efficiencylt', 'swimming', gender, (err, result) => {
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
          let ltTime = distance / velocityLT;
          let efficiencyIndex = ltTime / ((distance * 100) / height);
          results.indexLT = mathUtils.percentilRank(indexLTValues.samples, efficiencyIndex) * 10;
          results.indexLT = Math.round(results.indexLT * 100)/100;
          callback(null);
        },
        (callback) => {
          let anatTime = distance / velocityANAT;
          let efficiencyIndex = anatTime / ((distance * 100) / height);
          results.indexANAT = mathUtils.percentilRank(indexANATValues.samples, efficiencyIndex) * 10;
          results.indexANAT = Math.round(results.indexANAT * 100)/100;
          callback(null);
        },
        (callback) => {
          results.anaThreshold = mathUtils.percentilRank(anaThresholdValues.samples, velocityANAT) * 10;
          results.anaThreshold = Math.round(results.anaThreshold * 100)/100;
          callback(null);
        },
        (callback) => {
          results.lactateThreshold = mathUtils.percentilRank(lactateThresholdValues.samples, velocityLT) * 10;
          results.lactateThreshold = Math.round(results.lactateThreshold * 100)/100;
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