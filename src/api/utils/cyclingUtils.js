const dbUtils = require('./dbUtils');
const mathUtils = require('./mathUtils');
const cyclingTestModel = require('../models/cyclingTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');
const _ = require('lodash');
const async = require('async');

function processTest(pam, puan, puae, gender, mainCallback) {
  //PARAMETROS PARA EL RANGO PERCENTIL
  const results = {
    map: 0,
    vo2max: 0,
    anaThreshold: 0,
    at: 0 
  };
  /** */
  // OBTENCION DE VALORES
  async
    .parallel([
      (callback) => {
        dbUtils
          .getClasificationsBounds('pvo2max', 'cycling', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('vo2max', 'cycling', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('puan', 'cycling', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
      (callback) => {
        dbUtils
          .getClasificationsBounds('uan', 'cycling', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      }
    ], (err, res) => {
      let samples = _.sortBy(res, 'max');
      let pvo2maxValues = _.find(res, { aspect: 'pvo2max' });
      let vo2maxValues = _.find(res, { aspect: 'vo2max' });
      let puanValues = _.find(res, { aspect: 'puan' });
      let uanValues = _.find(res, { aspect: 'uan' });

      //  CALCULO DE PERCENTIL
      async.waterfall([
        (callback) => {
          results.map = mathUtils.percentilRank(pvo2maxValues.samples, pam) * 10;
          callback(null);
        },
        (callback) => {
          results.vo2max = mathUtils.percentilRank(vo2maxValues.samples, 60.5) * 10;
          callback(null);
        },
        (callback) => {
          results.anaThreshold = mathUtils.percentilRank(puanValues.samples, puan) * 10;
          callback(null);
        },
        (callback) => {
          results.at = mathUtils.percentilRank(uanValues.samples, 73) * 10;
          callback(null);
        }
      ], (err, res) => {
        mainCallback(null, results);
      });
    });
}

function processPeakTest(peakPower, gender, bodyWeight, aspect, mainCallback) {
  //PARAMETROS PARA EL RANGO PERCENTIL
  const results = {
    [aspect]: 0
  };
  // OBTENCION DE VALORES
  async
    .parallel([
      (callback) => {
        dbUtils
          .getClasificationsBounds(aspect, 'cycling', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      },
    ], (err, res) => {
      let samples = _.sortBy(res, 'max');
      let aspectSamples = _.find(res, { aspect });

      //  CALCULO DE PERCENTIL
      async.waterfall([
        (callback) => {
          results[aspect] = Math.round(mathUtils.percentilRank(aspectSamples.samples, peakPower/bodyWeight) * 10 * 100) / 100;
          callback(null);
        },
      ], (err, res) => {
        mainCallback(null, results);
      });
    });
}

module.exports = {
  getUserTests: (req, res) => {
    const { userId } = req.user;
    const result = [];
    cyclingTestModel
      .find({ athlete: userId, type: 'p6sec' })
      .sort({ date: -1 })
      .limit(3)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          result.push(...data);
          cyclingTestModel
            .find({ athlete: userId, type: 'p1min' })
            .sort({ date: -1 })
            .limit(3)
            .exec((err, data) => {
              if (err) {
                res.status(500).json(err);
              } else {
                result.push(...data);
                cyclingTestModel
                  .find({ athlete: userId, type: 'p6min' })
                  .sort({ date: -1 })
                  .limit(3)
                  .exec((err, data) => {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      result.push(...data);
                      cyclingTestModel
                        .find({ athlete: userId, type: 'p20min' })
                        .sort({ date: -1 })
                        .limit(3)
                        .exec((err, data) => {
                          if (err) {
                            res.status(500).json(err);
                          } else {
                            result.push(...data);
                            res.status(200).json(result);
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  },
  getUserTestsSixSec: (req, res) => {
    const { userId } = req.user;
    cyclingTestModel
      .find({ athlete: userId, type: 'p6sec' })
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
  getUserTestsOneMin: (req, res) => {
    const { userId } = req.user;
    cyclingTestModel
      .find({ athlete: userId, type: 'p1min'})
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
  getUserTestsSixMin: (req, res) => {
    const { userId } = req.user;
    cyclingTestModel
      .find({ athlete: userId, type: 'p6min'})
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
  getUserTestsTwentyMin: (req, res) => {
    const { userId } = req.user;
    cyclingTestModel
      .find({ athlete: userId, type: 'p20min'})
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

  //6s
  insertTestSixSec: (req, res) => {
    const { peakPower } = req.body;
    const { userId, gender, bodyWeight} = req.user;
    
    let result = processPeakTest(peakPower, gender, bodyWeight, 'p6sec', (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        const testToInsert = new cyclingTestModel({
          p6sec: result.p6sec,
          athlete: userId,
          type: 'p6sec',
          testId: uuid4()
        });
        testToInsert
          .save((err, data) => {
            if (err) {
              res.status(500).json({ message: 'Test could not be saved' });
            } else {
              result.testId = testToInsert.testId;
              res.status(200).json(result);
            }
          });
      }
    });
  },
  //1min
  insertTestOneMin: (req, res) => {
    const { peakPower } = req.body;
    const { userId, gender, bodyWeight} = req.user;
    
    let result = processPeakTest(peakPower, gender, bodyWeight, 'p1min', (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        const testToInsert = new cyclingTestModel({
          p1min: result.p1min,
          athlete: userId,
          type: 'p1min',
          testId: uuid4()
        });
    
        testToInsert
          .save((err, data) => {
            if (err) {
              res.status(500).json({ message: 'Test could not be saved' });
            } else {
              result.testId = testToInsert.testId;
              res.status(200).json(result);
            }
          });
      }
    });
  },
  //6min
  insertTestSixMin: (req, res) => {
    const { peakPower } = req.body;
    const { userId, gender, bodyWeight } = req.user;
    
    let result = processPeakTest(peakPower, gender, bodyWeight, 'p6min', (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
      } else {

        const testToInsert = new cyclingTestModel({
          p6min: result.p6min,
          athlete: userId,
          type: 'p6min',
          testId: uuid4()
        });
    
        testToInsert
          .save((err, data) => {
            if (err) {
              res.status(500).json({ message: 'Test could no be saved'});
            } else {
              result.testId = testToInsert.testId;
              res.status(200).json(result);
            }
          });
      }
    });
  },
  //  60min
  insertTestSixtyMin: (req, res) => {
    const { peakPower } = req.body;
    const { userId, gender, bodyWeight } = req.user;
    
    let result = processPeakTest(peakPower, gender, bodyWeight, 'p20min', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong'})
      } else {

        const testToInsert = new cyclingTestModel({
          p20min: result.p20min,
          athlete: userId,
          type: 'p20min',
          testId: uuid4()
        });
    
        testToInsert
          .save((err, data) => {
            if (err) {
              res.status(500).json({ message: 'Test could not be saved' });
            } else {
              result.testId = testToInsert.testId;
              res.status(200).json(result);
            }
          });
      }
    });
  },
  getTrainingZone: (req, res) => {
    cyclingTestModel
      .findOne({ type: 'p20min'})
      .sort({ date: -1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          let trainingZone = '';
          let trainingZoneTag = '';
          let testData = Number(data.p20min);

          if (testData < 124 && testData) {
            res.status(400).json({ message: 'There are no test to get training zone.' });
          }

          if (testData >= 124 && testData <= 178) {
            trainingZone = '0';
            trainingZoneTag = 'Recovery'
          }

          if (testData >= 181 && testData <= 242) {
            trainingZone = '1';
            trainingZoneTag = 'Aerobic Threshold'
          }

          if (testData >= 245 && testData <= 306) {
            trainingZone = '2';
          }

          if (testData >= 307 && testData <= 339) {
            trainingZone = '3';
            trainingZoneTag = 'Anaerobic Threshold'
          }

          if (testData >= 342 && testData <= 371) {
            trainingZone = '4';
          }

          if (testData >= 372 && testData <= 387.6) {
            trainingZone = '4';
            trainingZoneTag = 'Max Power'
          }

          if (testData >= 389 && testData <= 404) {
            trainingZone = '5';
          }

          if (testData >= 405 && testData <= 485) {
            trainingZone = '6';
          }

          if (testData >= 969 && testData <= 1195) {
            trainingZone = '7';
          }
          
          if (trainingZone) {
            res.status(200).json({ trainingZone, trainingZoneTag });
          } else {
            res.status(500).json({ message: 'Something went wrong' });
          }
        }
      })
  },
  deleteTest: (req, res) => {
    const { testId } = req.params;
    cyclingTestModel
      .deleteOne({ testId }, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          res.status(200).json({ message: 'Cycling test deleted' });
        }
      });
  }
};