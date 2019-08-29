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
    let { limit, offset } = req.params;
    limit = Number(limit);
    offset = Number(offset);
    const result = [];
    cyclingTestModel
      .find({ athlete: userId, type: 'p6sec' })
      .sort({ date: -1 })
      .limit(limit)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          result.push(...data);
          cyclingTestModel
            .find({ athlete: userId, type: 'p1min' })
            .sort({ date: -1 })
            .limit(limit)
            .skip(offset)
            .exec((err, data) => {
              if (err) {
                res.status(500).json(err);
              } else {
                result.push(...data);
                cyclingTestModel
                  .find({ athlete: userId, type: 'p6min' })
                  .sort({ date: -1 })
                  .limit(limit)
                  .skip(offset)
                  .exec((err, data) => {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      result.push(...data);
                      cyclingTestModel
                        .find({ athlete: userId, type: 'p20min' })
                        .sort({ date: -1 })
                        .limit(limit)
                        .skip(offset)
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
          peakPower,
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
          peakPower,
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
          peakPower,
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
          peakPower,
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
          let peakPower = data.peakPower;
          let result = module.exports.calculateTrainingZone(data.peakPower);
          
          if (result.error) {
            res.status(400).json({ message: result.error });
          } else {
            res.status(200).json({ trainingZone: result.trainingZone, trainingZoneTag: result.trainingZoneTag });
          }
        }
      });
  },
  calculateTrainingZone: (peakPower) => {
    let trainingZone = '0';
    let trainingZoneTag = '';
    let min, max = 124;

    if (peakPower >= 124 && peakPower <= 178) {
      max = 178
      trainingZone = '0';
      trainingZoneTag = 'Recovery'
    }

    if (peakPower >= 181 && peakPower <= 242) {
      min = 181;
      max = 242;
      trainingZone = '1';
      trainingZoneTag = 'Aerobic Threshold'
    }

    if (peakPower >= 245 && peakPower <= 306) {
      min = 245;
      max = 306;
      trainingZone = '2';
    }

    if (peakPower >= 307 && peakPower <= 339) {
      min = 307;
      max = 339;
      trainingZone = '3';
      trainingZoneTag = 'Anaerobic Threshold'
    }

    if (peakPower >= 342 && peakPower <= 371) {
      min = 342;
      max = 371;
      trainingZone = '4';
    }

    if (peakPower >= 372 && peakPower <= 387.6) {
      min = 372;
      max = 387.6;
      trainingZone = '4';
      trainingZoneTag = 'Max Power'
    }

    if (peakPower >= 389 && peakPower <= 404) {
      min = 389;
      max = 404;
      trainingZone = '5';
    }

    if (peakPower >= 405 && peakPower <= 485) {
      min = 405;
      max = 485;
      trainingZone = '6';
    }

    if (peakPower >= 969 && peakPower <= 1195) {
      min = 969;
      max = 1195;
      trainingZone = '7';
    }
    
    if (trainingZone) {
      return { trainingZone, trainingZoneTag, min, max };
    } else {
      if (peakPower < 124 && peakPower) {
        return { error: 'There are no tests to get training zone.' };
      } else {
        return { error: 'Something went wrong' };
      };
    }
  },
  deleteTest: (req, res) => {
    const { testId } = req.params;
    cyclingTestModel
      .deleteOne({ testId }, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          res.status(200).json({ message: 'Test deleted. '});
        }
      });
  },
  getProgress: (req, res) => {
    const { userId } = req.user;
    let { limit, offset } = req.params;
    limit = Number(limit);
    offset = Number(offset);
    console.log('BUsco runnint test con este id:', userId);
    cyclingTestModel
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
            let trainingZone = module.exports.calculateTrainingZone(tests[i].peakPower);
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