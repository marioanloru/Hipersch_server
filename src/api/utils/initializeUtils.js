const dbUtils = require('./dbUtils');

const clasificationsModel = require('../models/clasifications');

module.exports = {
  initializeRunningTable: (req, res) => {
    // VVO2MAX
    const excelentWomenVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 21.8,
      min: 20,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 19,
      min: 17.5,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 16.5,
      min: 14.8,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 13.2,
      min: 11.7,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 10.2,
      min: 8.7,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 7.1,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 24,
      min: 22.2,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 21.8,
      min: 20,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 19,
      min: 17.5,
      gender: 'male',
      clasification: 'good'
    });
    const averageManVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 16,
      min: 14.6,
      gender: 'male',
      clasification: 'average'
    });
    const lowManVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 13.2,
      min: 11.7,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManVVO = new clasificationsModel({
      aspect: 'vvo2max',
      profile: 'running',
      max: 10.2,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    // vUAN
    const excelentWomenvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 19.6,
      min: 18,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 17.1,
      min: 15.8,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 14.9,
      min: 13.3,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 11.9,
      min: 10.6,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 9.2,
      min: 7.8,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 6.4,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 21.6,
      min: 20,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 19.6,
      min: 18,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 17.1,
      min: 15.8,
      gender: 'male',
      clasification: 'good'
    });
    const averageManvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 14.4,
      min: 13.1,
      gender: 'male',
      clasification: 'average'
    });
    const lowManvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 11.9,
      min: 10.5,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManvUAN = new clasificationsModel({
      aspect: 'vuan',
      profile: 'running',
      max: 9.2,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  vUAE
    /*const excelentWomenvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 21.8,
      min: 20,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 19,
      min: 17.5,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 16.5,
      min: 14.8,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 13.2,
      min: 11.7,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 10.2,
      min: 8.7,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 7.1,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 24,
      min: 22.2,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 21.8,
      min: 20,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 19,
      min: 17.5,
      gender: 'male',
      clasification: 'good'
    });
    const averageManvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 16,
      min: 14.6,
      gender: 'male',
      clasification: 'average'
    });
    const lowManvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 13.2,
      min: 11.7,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManvUAE = new clasificationsModel({
      aspect: 'vuae',
      profile: 'running',
      max: 10.2,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });*/

    const docs = [excelentWomenVVO, excelentManVVO, veryGoodWomenVVO, veryGoodManVVO,
      goodWomenVVO, goodManVVO, averageWomenVVO, averageManVVO, lowWomenVVO, lowManVVO,
      excelentWomenvUAN, excelentManvUAN, veryGoodWomenvUAN, veryGoodManvUAN,
      goodWomenvUAN, goodManvUAN, averageWomenvUAN, averageManvUAN, lowWomenvUAN, lowManvUAN/*,
      excelentWomenvUAE, excelentManvUAE, veryGoodWomenvUAE, veryGoodManvUAE,
    goodWomenvUAE, goodManvUAE, averageWomenvUAE, averageManvUAE, lowWomenvUAE, lowManvUAE*/];
    
    dbUtils
      .initialize(docs, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log(res);
          res.status(200).json({ message: 'Database initialized.' });
        }
    });
  }

};