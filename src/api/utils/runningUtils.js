const dbUtils = require('./dbUtils');
const runningTestModel = require('../models/runningTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');

const mavVvO2maxRunningSamples = clasificationModel.find({ aspect: 'vvo2max', profile: 'running' });

function processSixMinutesTest(distance, vo2maxIndirect) {
  const speed = distance/360; 
  const results = {
    speed,
    MAVvVo2max,
    vo2max,
    vat 
  };
  
  results.MAVvVo2max = percentil(10, speed, vVo2maxPorGenero) * 10;
  //results.MAVvVo2max = percentilRank(mavVvO2maxRunningSamples, );
  //results.vo2max = percentil(vo2maxIndirect, vo2maxPorGenero) * 10;
  //results.vo2max = percentil((speed*85)/100, vUANPorGenero) * 10;

  return results;
}

function percentilRank(samples, value, percentage) {
  let valueInSample = false;
  let timesUnder = 0;
  let timesAbove = 0;
  let res = 0.0; 

  for (let i = 0; i < samples.length; i += 1) {
    if (samples[i] === value && !valueInSample) {
      valueInSample = true;
    } else {
      if (samples[i] < value) {
        timesUnder += 1;
      } else if (samples[i] > value) {
        timesAbove += 1;
      }
    }
  }

  if (valueInSample) {
    res = timesUnder / (timesUnder + timesAbove);
  } else {
    res = percentilRank(elvalorinferior) + 0.25*(percentilRank(cotainferior) - percentilRank(cotasuperior));
  }
    return res;
}

module.exports = {
  insertTestSixMinutes: (req, res) => {
    const { distance } = req.body;
    const { userId } = req.user;
    
    //  AQUI PROCESAR TEST Y OBTENER INFO PARA EL MODELO
    let result = processSixMinutesTest(distance);

    const testToInsert = new runningTestModel({
      distance,
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