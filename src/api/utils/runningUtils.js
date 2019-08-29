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
    speed: Math.round(speedKMH*100)/100,
    MAVvVo2max: 0,
    vo2max: 0,
    vat: 0 
  };
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
          results.MAVvVo2max = Math.round(mathUtils.percentilRank(mavValues.samples, speedKMH)*10 * 100) / 100;
          callback(null);
        },
        (callback) => {
          results.vo2max = Math.round(mathUtils.percentilRank(vo2Values.samples, vo2maxIndirect) * 10 * 100) / 100;
          callback(null);
        },
        (callback) => {
          //  15.3 comes from ergospirometric test
          results.vat = Math.round(mathUtils.percentilRank(vuanValues.samples, 15.3) * 10 * 100) / 100;
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
    const { userId, gender } = req.user;
    processSixMinutesTest(distance, gender, 45.1, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const testToInsert = new runningTestModel({
          distance,
          speed: result.speed,
          MAVvVo2max: result.MAVvVo2max,
          vo2max: result.vo2max,
          vat: result.vat,
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
  },
  getUserTests: (req, res) => {
    const { userId } = req.user;
    let { limit, offset } = req.params;
    limit = Number(limit);
    offset = Number(offset);
    runningTestModel
      .find({ athlete: userId })
      .sort({ date: -1 })
      .skip(offset)
      .limit(limit)
      .exec((err, data) => {
        console.log(err, data);
        if (err) {
          res.status(500).json({ message: "Something went wrong." });
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
      .find({ athlete: userId})
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  },
  deleteTest: (req, res) => {
    console.log("Borrando test!");
    const { testId } = req.params;
    runningTestModel
      .deleteOne({ testId }, (err, test) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          res.status(200).json({ message: 'Test deleted. '});
        }
      });
  },
  getTrainingZone: (req, res) => {
    runningTestModel
      .findOne({})
      .sort({ date: -1 })
      .exec((err, test) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          console.log(test);

          let trainingZone = module.exports.calculateTrainingZone(test.speed).trainingZone;
          res.status(200).json({ trainingZone });
        }
      });
  },
  calculateTrainingZone: (speed) => {
    const testSpeed = speed;
    let trainingZone = 0;
    let min, max = 0;

    if (testSpeed >= 11.7) {
      max = 11.7;
      trainingZone = 1;
    }

    if (testSpeed >= 12.3) {
      min = 11.7;
      max = 12.3;
      trainingZone = 2;
    }
    
    if (testSpeed >= 15.3) {
      min = 12.3;
      max = 15.3;
      trainingZone = 3;
    }

    if (testSpeed >= 15.8) {
      min = 15.3;
      max = 15.8;
      trainingZone = 4;
    }

    if (testSpeed >= 18) {
      min = 15.8;
      max = 18;
      trainingZone = 'vam';
    }

    if (testSpeed >= 18.6) {
      min = 18;
      max = 18.6;
      trainingZone = 6;
    }

    if (testSpeed >= 19.9) {
      min = 18.6;
      max = 19.9;
      trainingZone = 7;
    }

    if (testSpeed >= 25.2) {
      min = 19.9;
      max = 25.2;
      trainingZone = 'velocity';
    }
    return { trainingZone, min, max };
  },
  getProgress: (req, res) => {
    const { userId } = req.user;
    let { limit, offset } = req.params;
    limit = Number(limit);
    offset = Number(offset);
    console.log('BUsco runnint test con este id:', userId);
    runningTestModel
      .find({ athlete: userId })
      .sort({ date: -1 })
      .limit(5)
      .exec((err, tests) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong." });
        } else {
          console.log("testsss::", tests);
          const output = [];
          for (let i = 0; i < tests.length; i += 1) {
            let data = {};
            console.log('--->', );
            let trainingZone = module.exports.calculateTrainingZone(tests[i].speed);
            data.trainingZone = trainingZone.trainingZone;
            data.min = trainingZone.min;
            data.max = trainingZone.max;
            output.push(data);
          }
          console.log('Resultado!! ', output);
          res.status(200).json(output);
        }
      });
  }
};