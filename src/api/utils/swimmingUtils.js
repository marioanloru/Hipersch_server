const dbUtils = require('./dbUtils');
const mathUtils = require('./mathUtils');
const swimmingTestModel = require('../models/swimmingTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');
const _ = require('lodash');
const async = require('async');

//  Function to process a swimming test
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

//  Function to calculate thresholds based on swimming category
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
  //  Function to get current user tests
  getUserTests: (req, res) => {
    const { userId } = req.user;
    let { limit, offset } = req.params;
    limit = Number(limit);
    offset = Number(offset);
    swimmingTestModel
      .find({ athlete: userId })
      .sort({ date: -1 })
      .limit(limit)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  },
  //  Function to insert a swimming test
  insertTest: (req, res) => {
    //  Time must be in seconds
    const { timeFourHundred, timeTwoHundred } = req.body;
    const { userId, gender, height, swimmingCategory } = req.user;
    
    const thresholds = calculateThresholds(timeFourHundred, timeTwoHundred, swimmingCategory);
    processTest(thresholds.velocityLT, thresholds.velocityANAT, gender, height, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        const result = {
          indexLT: Math.floor(data.indexLT * 100) / 100,
          indexANAT: Math.floor(data.indexANAT * 100) / 100,
          anaThreshold: Math.floor(data.anaThreshold * 100) / 100,
          lactateThreshold: Math.floor(data.lactateThreshold * 100) / 100
        };
        const testToInsert = new swimmingTestModel({
          indexLT: result.indexLT,
          indexANAT: result.indexANAT,
          anaThreshold: result.anaThreshold,
          lactateThreshold: result.lactateThreshold,
          athlete: userId,
          timeTwoHundred,
          timeFourHundred,
          testId: uuid4()
        });
    
        testToInsert
          .save((err, saveData) => {
            if (err) {
              res.status(500).json(err);
            } else {
              result.testId = testToInsert.testId;
              result.timeFourHundred = testToInsert.timeFourHundred;
              result.timeTwoHundred = testToInsert.timeTwoHundred;
              res.status(200).json(result);
            }
          });
      }
    });
  },
  //  Function to delete a test by testId
  deleteTest: (req, res) => {
    const { testId } = req.params;
    swimmingTestModel
      .deleteOne({ testId }, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          res.status(200).json({ message: 'Test deleted. '});
        }
      });
  },
  //  Function to retrieve training zones
  getTrainingZone: (req, res) => {
    swimmingTestModel
      .findOne({})
      .sort({ date: -1 })
      .exec((err, test) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          console.log(test);
          let data = module.exports.calculateTrainingZone(test.timeTwoHundred, test.timeFourHundred);
          res.status(200).json({ trainingZoneTwoHundred: data.trainingZoneTwoHundred, trainingZoneFourHundred: data.trainingZoneFourHundred});
        }
      });
  },
  //  Function to calculate training zones
  calculateTrainingZone: (timeTwoHundred, timeFourHundred) => {
    let trainingZoneTwoHundred = 'aei', trainingZoneFourHundred = 'aei';
    let minTwoHundred = 0, minFourHundred = 0;
    let maxTwoHundred = 167.5, maxFourHundred = 335.9;
    
    if (timeTwoHundred > 176) {
      minTwoHundred = 176;
      maxTwoHundred = 182.4;
      trainingZoneTwoHundred = 'aem';
    }

    if (timeTwoHundred > 182.4) {
      minTwoHundred = 182.4;
      maxTwoHundred = 500;
      trainingZoneTwoHundred = 'ael';
    }

    if (timeFourHundred > 352.9) {
      minFourHundred = 352.9;
      maxFourHundred = 365.9;
      trainingZoneFourHundred = 'aem';
    }

    if (timeFourHundred > 365.9) {
      minFourHundred = 365.9;
      maxFourHundred = 500;
      trainingZoneFourHundred = 'ael';
    }

    return { trainingZoneTwoHundred, trainingZoneFourHundred, minTwoHundred, maxTwoHundred, minFourHundred, maxFourHundred };
  },
  //  Function to get five last tests training zone sorted by date
  getProgress: (req, res) => {
    const { userId } = req.user;
    let { limit, offset } = req.params;
    limit = Number(limit);
    offset = Number(offset);
    swimmingTestModel
      .find({ athlete: userId })
      .sort({ date: -1 })
      .limit(5)
      .exec((err, tests) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong." });
        } else {
          const output = [];
          for (let i = 0; i < tests.length; i += 1) {
            let data = {};
            let trainingZone = module.exports.calculateTrainingZone(tests[i].timeTwoHundred, tests[i].timeFourHundred);
            data.trainingZone = trainingZone.trainingZone;
            data.minTwoHundred = trainingZone.minTwoHundred;
            data.maxTwoHundred = trainingZone.maxTwoHundred;
            data.minFourHundred = trainingZone.minFourHundred;
            data.maxFourHundred = trainingZone.maxFourHundred;
            data.trainingZoneTwoHundred = trainingZone.trainingZoneTwoHundred;
            data.trainingZoneFourHundred = trainingZone.trainingZoneFourHundred;
            output.push(data);
          }
          res.status(200).json(output);
        }
      });
  }
}