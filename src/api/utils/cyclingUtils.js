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
      console.log('PVO2MAX VALUEEES:: pvo2maxValues' , pvo2maxValues, pam);
      console.log('PVO2MAX VALUEEES:: vo2maxValues' , vo2maxValues);
      console.log('PVO2MAX VALUEEES:: puanValues' , puanValues, puan);
      console.log('PVO2MAX VALUEEES:: uanValues' , uanValues);

      //  CALCULO DE PERCENTIL
      async.waterfall([
        (callback) => {
          results.map = mathUtils.percentilRank(pvo2maxValues.samples, pam) * 10;
          console.log('RANGO PERCENTIL DE MAP:: ', results.map, typeof(results.vo2max));
          results.map = Math.round(results.map * 100)/100;
          callback(null);
        },
        (callback) => {
          results.vo2max = mathUtils.percentilRank(vo2maxValues.samples, 60.5) * 10;
          console.log('RANGO PERCENTIL DE vo2max:: ', results.vo2max, typeof(results.vo2max));
          results.vo2max = Math.round(results.vo2max * 100)/100;
          callback(null);
        },
        (callback) => {
          results.anaThreshold = mathUtils.percentilRank(puanValues.samples, puan) * 10;
          console.log('RANGO PERCENTIL DE anaThreshold:: ', results.anaThreshold, typeof(results.anaThreshold));
          results.anaThreshold = Math.round(results.anaThreshold * 100)/100;
          callback(null);
        },
        (callback) => {
          results.at = mathUtils.percentilRank(uanValues.samples, 73) * 10;
          console.log('RANGO PERCENTIL DE at:: ', results.at, typeof(results.at));
          results.at = Math.round(results.at * 100)/100;
          callback(null);
        }
      ], (err, res) => {
        mainCallback(null, results);
      });
    });
}

module.exports = {
  //  valores de la telaraña
  insertTest: (req, res) => {
    const { pam, puan, puae } = req.body;
    const { userId, gender} = req.user;
    
    let result = processTest(pam, puan, puae, gender, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('VALORES OBTENIDOS DE PROCESAR EL TEST:: ', result);
        const testToInsert = new cyclingTestModel({
          map: result.map,
          vo2max: result.vo2max,
          anaThreshold: result.anaThreshold,
          at: result.at,
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
};