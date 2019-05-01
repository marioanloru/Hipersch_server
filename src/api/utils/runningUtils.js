const dbUtils = require('./dbUtils');
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
          .getClasificationsBounds('vuan', 'running', gender, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
      }
    ], (err, res) => {
      console.log('clasification bounds ----> ', res);
      let samples = _.sortBy(res, 'max');
      let mavValues = _.find(res, { aspect: 'vvo2max' });
      console.log('samplesss---->', mavValues)
      async.waterfall([
        (callback) => {
          results.MAVvVo2max = percentilRank(mavValues.samples, speedKMH) * 10;
          callback(null);
        },
        (callback) => {
          results.MAVvVo2max = percentilRank(mavValues.samples, speedKMH) * 10;
          callback(null);
        },
        (callback) => {
          results.MAVvVo2max = percentilRank(mavValues.samples, speedKMH) * 10;
          callback(null);
        }
      ], (err, res) => {
        console.log('RESULTADOS QUE DEVUELVOO', results);
          //results.vo2max = percentil(vo2maxIndirect, vo2maxPorGenero) * 10;
          //results.vo2max = percentil((speed*85)/100, vUANPorGenero) * 10;
        mainCallback(null, results);
      });
    });
  /** */
}

function percentilRank(samples, value) {
  let valueInSample = false;
  let valuePassed = false;
  let timesUnder = 0;
  let timesAbove = 0;
  let valueAbove = 0;
  let valueBelow = 0;
  let res = 0.0; 

  //  Look for value bounds
  for (let i = 0; i < samples.length; i += 1) {
    if (samples[i] === value && !valueInSample) {
      valueInSample = true;
    } else {
      if (samples[i] < value) {
        timesUnder += 1;
      } else if (samples[i] > value) {
        if (!valuePassed ) {
          valuePassed = true;
          valueAbove = samples[i];
          if (valueInSample) {
            valueBelow = samples[i - 2];
          } else {
            valueBelow = samples[i - 1];
          }
        }
        timesAbove += 1;
      }
    }
  }

  if (valueInSample) {
    res = timesUnder / (timesUnder + timesAbove);
  } else {
    let percentileBelow = percentilRank(samples, valueBelow);
    let percentileAbove = percentilRank(samples, valueAbove);
    res = percentileBelow + 0.25*(percentileAbove - percentileBelow);
  }
    return res;
}

module.exports = {
  insertTestSixMinutes: (req, res) => {
    const { distance, gender } = req.body;
    const { userId } = req.user;
    
    //  AQUI PROCESAR TEST Y OBTENER INFO PARA EL MODELO
    console.log('ANTES DE INSERTAR EL TEST!!');
    let result = processSixMinutesTest(distance, gender, null, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('RESULTADO DE INSERTAR PROCESS SIX MINUTES TEST', result);
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
              res.status(200).json(data);
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