const dbUtils = require('./dbUtils');
const runningTestModel = require('../models/runningTest');
const clasificationsModel = require('../models/clasifications');
const uuid4 = require('uuid4');

module.exports = {
  insertTestSixMinutes: (req, res) => {
    const { distance } = req.body;
    const { userId } = req.user;
    
    //  AQUI PROCESAR TEST Y OBTENER INFO PARA EL MODELO

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