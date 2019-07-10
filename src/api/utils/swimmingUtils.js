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
          callback(null);
        },
        (callback) => {
          let anatTime = distance / velocityANAT;
          let efficiencyIndex = anatTime / ((distance * 100) / height);
          results.indexANAT = mathUtils.percentilRank(indexANATValues.samples, efficiencyIndex) * 10;
          callback(null);
        },
        (callback) => {
          results.anaThreshold = Math.round(mathUtils.percentilRank(anaThresholdValues.samples, velocityANAT) * 10 * 100) / 100;
          callback(null);
        },
        (callback) => {
          results.lactateThreshold = mathUtils.percentilRank(lactateThresholdValues.samples, velocityLT) * 10;
          callback(null);
        }
      ], (err, res) => {
        mainCallback(null, results);
      });
    });
}

//  Time comes in seconds
function calculateThresholds(timeFourHundred, timeTwoHundred, swimmingCategory) {
  const result = { anat: 0, lt: 0 };
  const categoryWeights = {
    'afld': 0.01,   //  Adult Female Long Distance
    'afs': 0.025,   //  Adult Female Sprinter
    'amld': 0.015,  //  Adult Male Long Distance
    'ams': 0.025,   //  Adult Male Sprinter
    'jfld': 0.01,   //  Junior Female Long Distance
    'jfs': 0.025,   //  Junior Female Sprinter
    'jmld': 0.015,  //  Junior Male Long Distance
    'jms': 0.035,   //  Junior Male Sprinter
    'if': 0.02,     //  Infantile Female
    'im': 0.025,    // Infantile Male
    'bf': 0.02,     //  Beginner Female
    'bm': 0.025     //  Beginner Male
  }


  let vcrit, vcritFixed;
  vcrit = (400 - 200) / (timeFourHundred - timeTwoHundred);
  vcrit = Math.round(vcrit * 1000) / 1000;
  
  //  Fix based on athlete category
  vcritFixed = vcrit - (vcrit * categoryWeights[swimmingCategory.toLowerCase()]);
  vcritFixed = Math.round(vcritFixed * 1000) / 1000;


  //  Last percentage is a fixed boost
  result.velocityANAT = 1500 / ((1500 / vcrit) * 1.035);
  result.velocityLT = 1500 / ((1500 / vcrit) * 1.073);

  return result;
}



module.exports = {
  getUserTests: (req, res) => {
    const { userId } = req.user;
    swimmingTestModel
      .find({ athlete: userId })
      .sort({ date: -1 })
      .limit(3)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  },
  insertTest: (req, res) => {
    //  Time must be in seconds
    const { timeFourHundred, timeTwoHundred } = req.body;
    const { userId, gender, height, swimmingCategory } = req.user;
    
    const thresholds = calculateThresholds(timeFourHundred, timeTwoHundred, swimmingCategory);
    processTest(thresholds.velocityLT, thresholds.velocityANAT, gender, height, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        const testToInsert = new swimmingTestModel({
          indexLT: result.indexLT,
          indexANAT: result.indexANAT,
          anaThreshold: result.anaThreshold,
          lactateThreshold: result.lactateThreshold,
          athlete: userId,
          testId: uuid4()
        });
    
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
  },
  deleteTest: (req, res) => {
    const { testId } = req.body;
    swimmingTestModel
      .deleteOne({ testId }, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          res.status(200).json(test);
        }
      });
  }
}