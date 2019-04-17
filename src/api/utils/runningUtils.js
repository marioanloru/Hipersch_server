const dbUtils = require('./dbUtils');
const runningTestModel = require('../models/runningTest');
const clasificationsModel = require('../models/clasifications');

module.exports = {
  insertTestSixMinutes: (req, res) => {
    const { distance } = req.params;
    //const user; VER COMO SE REFERENCIA AL USUARIO POR PETICION
    
    const testToInsert = new runningTestModel({
      distance
      //athlete
    });

    runningTestModel
      .insertOne(testToInsert)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  },
  getUserTests: (req, res) => {
    const { user } = req.params;
    runningTestModel
      .findOne(user)
      .exec((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      });
  }

}