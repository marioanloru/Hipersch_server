const clasificationsModel = require('../src/api/models/clasifications')

module.exports = {
  initializeRunningTable: (callback) => {
    //  VO2MAX
    const excelentWomenVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 75,
      min: 70,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 65,
      min: 60,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 55,
      min: 50,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 45,
      min: 40,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 35,
      min: 30,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 25,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 85,
      min: 80,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 75,
      min: 70,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 65,
      min: 60,
      gender: 'male',
      clasification: 'good'
    });
    const averageManVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 55,
      min: 50,
      gender: 'male',
      clasification: 'average'
    });
    const lowManVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 45,
      min: 40,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManVO = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'running',
      max: 35,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });
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

    const docs = [excelentWomenVO, excelentManVO, veryGoodWomenVO, veryGoodManVO,
      goodWomenVO, goodManVO, averageWomenVO, averageManVO, lowWomenVO, lowManVO,
      veryLowWomenVO, veryLowManVO, excelentWomenVVO, excelentManVVO, veryGoodWomenVVO, veryGoodManVVO,
      goodWomenVVO, goodManVVO, averageWomenVVO, averageManVVO, lowWomenVVO, lowManVVO, 
      veryLowWomenVVO, veryLowManVVO, excelentWomenvUAN, excelentManvUAN,
      veryGoodWomenvUAN, veryGoodManvUAN, goodWomenvUAN, goodManvUAN, averageWomenvUAN,
      averageManvUAN, lowWomenvUAN, lowManvUAN, veryLowWomenvUAN, veryLowManvUAN];
    
    //  Limpiar base de datos primero si existe algo
    clasificationsModel
      .deleteMany({})
      .exec((err, res) => {
        if (err) {
          console.log('Algo ha fallado: ', err);
          callback(err);
        } else {
          clasificationsModel
            .insertMany(docs, (errr, res) => {
              if (err) {
                console.log('Algo ha fallado');
                callback(errr);
              } else {
                console.log('Modelos de clasificacion de "running" insertados');
                callback(null, res);
              }
            });
        }
      });
  },
  //  CICLISMOOO
  initializeCyclingTable: (callback) => {
    //  Pvo2max
    const excelentWomenPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 450,
      min: 375,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 345,
      min: 315,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 285,
      min: 263,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 244,
      min: 225,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 203,
      min: 180,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 150,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 600,
      min: 500,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 460,
      min: 420,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 380,
      min: 350,
      gender: 'male',
      clasification: 'good'
    });
    const averageManPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 325,
      min: 300,
      gender: 'male',
      clasification: 'average'
    });
    const lowManPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 270,
      min: 240,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManPvo2max = new clasificationsModel({
      aspect: 'pvo2max',
      profile: 'cycling',
      max: 200,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });
    
    //  vo2max
    const excelentWomenVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 70,
      min: 65,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 61,
      min: 57,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 53,
      min: 49,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 45,
      min: 41,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 37,
      min: 33,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 30,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 80,
      min: 77,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 72,
      min: 67,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 62,
      min: 57,
      gender: 'male',
      clasification: 'good'
    });
    const averageManVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 52,
      min: 47,
      gender: 'male',
      clasification: 'average'
    });
    const lowManVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 43,
      min: 40,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManVo2max = new clasificationsModel({
      aspect: 'vo2max',
      profile: 'cycling',
      max: 35,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  PUAN
    const excelentWomenPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 375,
      min: 315,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 289,
      min: 263,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 236,
      min: 210,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 184,
      min: 158,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 131,
      min: 105,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 79,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 500,
      min: 420,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 385,
      min: 350,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 315,
      min: 280,
      gender: 'male',
      clasification: 'good'
    });
    const averageManPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 245,
      min: 210,
      gender: 'male',
      clasification: 'average'
    });
    const lowManPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 175,
      min: 140,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManPuan = new clasificationsModel({
      aspect: 'puan',
      profile: 'cycling',
      max: 105,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  UAN (%)
    const excelentWomenUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 93,
      min: 92,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 91,
      min: 90,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 88,
      min: 85,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 80,
      min: 80,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 75,
      min: 70,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 65,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 93,
      min: 92,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 91,
      min: 90,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 88,
      min: 85,
      gender: 'male',
      clasification: 'good'
    });
    
    const averageManUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 80,
      min: 80,
      gender: 'male',
      clasification: 'average'
    });

    const lowManUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 75,
      min: 70,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManUan = new clasificationsModel({
      aspect: 'uan',
      profile: 'cycling',
      max: 65,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    const docs = [excelentWomenPvo2max, excelentManPvo2max, veryGoodWomenPvo2max, veryGoodManPvo2max, goodWomenPvo2max, goodManPvo2max,
      averageWomenPvo2max, averageManPvo2max, lowWomenPvo2max, lowManPvo2max, veryLowWomenPvo2max, veryLowManPvo2max,
      excelentWomenVo2max, excelentManVo2max, veryGoodWomenVo2max, veryGoodManVo2max, goodWomenVo2max, goodManVo2max,
      averageWomenVo2max, averageManVo2max, lowWomenVo2max, lowManVo2max, veryLowWomenVo2max, veryLowManVo2max,
      excelentWomenPuan, excelentManPuan, veryGoodWomenPuan, veryGoodManPuan, goodWomenPuan, goodManPuan,
      averageWomenPuan, averageManPuan, lowWomenPuan, lowManPuan, veryLowWomenPuan, veryLowManPuan,
      excelentWomenUan, excelentManUan, veryGoodWomenUan, veryGoodManUan, goodWomenUan, goodManUan,
      averageWomenUan, averageManUan, lowWomenUan, lowManUan, veryLowWomenUan, veryLowManUan];
    
    //  Limpiar base de datos primero si existe algo
    clasificationsModel
      .deleteMany({})
      .exec((err, res) => {
        if (err) { 
          console.log('Algo ha fallado: ', err);
          callback(err);
        } else {
          clasificationsModel
            .insertMany(docs, (errr, res) => {
              if (err) {
                console.log('Algo ha fallado');
                callback(errr);
              } else {
                console.log('Modelos de clasificacion de "cyclism" insertado');
                callback(null, res);
              }
            });
        }
      });
  },

  // CYCLING PEAK TABLES
  initializeCyclingPeakTable: (callback) => {
    //  p5s
    const excelentWomenP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 18.77,
      min: 17.91,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 17.05,
      min: 15.97,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 14.89,
      min: 13.82,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 12.74,
      min: 11.66,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 10.58,
      min: 9.51,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 8.43,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 23.22,
      min: 22.14,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 21.05,
      min: 19.69,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 18.33,
      min: 16.97,
      gender: 'male',
      clasification: 'good'
    });
    const averageManP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 15.61,
      min: 14.25,
      gender: 'male',
      clasification: 'average'
    });
    const lowManP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 12.89,
      min: 11.53,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManP5s = new clasificationsModel({
      aspect: 'p5s',
      profile: 'cycling',
      max: 10.17,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });
    
    // p1min
    const excelentWomenP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 9.02,
      min: 8.66,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 8.29,
      min: 7.84,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 7.39,
      min: 6.93,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 6.48,
      min: 6.03,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 5.57,
      min: 5.12,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 4.67,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 11.16,
      min: 10.70,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 10.24,
      min: 9.66,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 9.09,
      min: 8.51,
      gender: 'male',
      clasification: 'good'
    });
    const averageManP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 7.94,
      min: 7.36,
      gender: 'male',
      clasification: 'average'
    });
    const lowManP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 6.79,
      min: 6.21,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManP1min = new clasificationsModel({
      aspect: 'p1min',
      profile: 'cycling',
      max: 5.64,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  p5min
    const excelentWomenP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 6.33,
      min: 5.96,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 5.59,
      min: 5.13,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 4.67,
      min: 4.30,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 3.74,
      min: 3.28,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 2.82,
      min: 2.35,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 1.89,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 7.29,
      min: 6.88,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 6.47,
      min: 5.95,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 5.43,
      min: 4.90,
      gender: 'male',
      clasification: 'good'
    });
    const averageManP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 4.39,
      min: 3.87,
      gender: 'male',
      clasification: 'average'
    });
    const lowManP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 3.35,
      min: 2.84,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManP5min = new clasificationsModel({
      aspect: 'p5min',
      profile: 'cycling',
      max: 2.33,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  p60min
    const excelentWomenP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 5.44,
      min: 5.12,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 4.79,
      min: 4.38,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 3.97,
      min: 3.55,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 3.14,
      min: 2.73,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 2.32,
      min: 1.91,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 1.50,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 6.13,
      min: 5.78,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 5.42,
      min: 4.98,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 4.53,
      min: 4.09,
      gender: 'male',
      clasification: 'good'
    });
    const averageManP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 3.64,
      min: 3.20,
      gender: 'male',
      clasification: 'average'
    });
    const lowManP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 2.75,
      min: 2.31,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManP60min = new clasificationsModel({
      aspect: 'p60min',
      profile: 'cycling',
      max: 1.86,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    const docs = [excelentWomenP5s, excelentManP5s, veryGoodWomenP5s, veryGoodManP5s, goodWomenP5s, goodManP5s,
      averageWomenP5s, averageManP5s, lowWomenP5s, lowManP5s, veryLowWomenP5s, veryLowManP5s,
      excelentWomenP1min, excelentManP1min, veryGoodWomenP1min, veryGoodManP1min, goodWomenP1min, goodManP1min,
      averageWomenP1min, averageManP1min, lowWomenP1min, lowManP1min, veryLowWomenP1min, veryLowManP1min,
      excelentWomenP5min, excelentManP5min, veryGoodWomenP5min, veryGoodManP5min, goodWomenP5min, goodManP5min,
      averageWomenP5min, averageManP5min, lowWomenP5min, lowManP5min, veryLowWomenP5min, veryLowManP5min,
      excelentWomenP60min, excelentManP60min, veryGoodWomenP60min, veryGoodManP60min, goodWomenP60min, goodManP60min,
      averageWomenP60min, averageManP60min, lowWomenP60min, lowManP60min, veryLowWomenP60min, veryLowManP60min,
    ];
    
    //  Limpiar base de datos primero si existe algo
    clasificationsModel
      .deleteMany({})
      .exec((err, res) => {
        if (err) { 
          console.log('Algo ha fallado: ', err);
          callback(err);
        } else {
          clasificationsModel
            .insertMany(docs, (errr, res) => {
              if (err) {
                console.log('Algo ha fallado');
                callback(errr);
              } else {
                console.log('Modelos de clasificacion de "cyclism peak" insertados');
                callback(null, res);
              }
            });
        }
      });
  },
  // Swimming
  initializeSwimmingTable: (callback) => {
    //  EfficiencyLt
    const excelentWomenEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 0.15,
      min: 0.4,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 0.65,
      min: 0.9,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 1.15,
      min: 1.4,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 1.65,
      min: 1.9,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 2.15,
      min: 2.4,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 2.65,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 0.15,
      min: 0.4,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 0.65,
      min: 0.9,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 1.15,
      min: 1.4,
      gender: 'male',
      clasification: 'good'
    });
    const averageManEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 1.65,
      min: 1.9,
      gender: 'male',
      clasification: 'average'
    });
    const lowManEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 2.15,
      min: 2.4,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManEfficiencyLt = new clasificationsModel({
      aspect: 'efficiencylt',
      profile: 'swimming',
      max: 2.65,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  EfficiencyAnat
    const excelentWomenEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 0.2,
      min: 0.4,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 0.65,
      min: 0.9,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 1.15,
      min: 1.4,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 1.65,
      min: 1.9,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 2.15,
      min: 2.4,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 2.65,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 0.2,
      min: 0.4,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 0.65,
      min: 0.9,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 1.15,
      min: 1.4,
      gender: 'male',
      clasification: 'good'
    });
    const averageManEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 1.65,
      min: 1.9,
      gender: 'male',
      clasification: 'average'
    });
    const lowManEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 2.15,
      min: 2.4,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManEfficiencyAnat = new clasificationsModel({
      aspect: 'efficiencyanat',
      profile: 'swimming',
      max: 2.65,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });
    
    //  AnaThreshold
    const excelentWomenAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.68,
      min: 1.58,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.48,
      min: 1.38,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.28,
      min: 1.18,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.08,
      min: 0.98,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 0.88,
      min: 0.78,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 0.68,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.82,
      min: 1.72,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.62,
      min: 1.52,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.42,
      min: 1.32,
      gender: 'male',
      clasification: 'good'
    });
    const averageManAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.22,
      min: 1.12,
      gender: 'male',
      clasification: 'average'
    });
    const lowManAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 1.02,
      min: 0.92,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManAnaThreshold = new clasificationsModel({
      aspect: 'anathreshold',
      profile: 'swimming',
      max: 0.82,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    //  LactateThreshold
    const excelentWomenLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 1.45,
      min: 1.35,
      gender: 'female',
      clasification: 'excelent'
    });
    const veryGoodWomenLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 1.25,
      min: 1.15,
      gender: 'female',
      clasification: 'verygood'
    });
    const goodWomenLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 1.05,
      min: 0.95,
      gender: 'female',
      clasification: 'good'
    });
    const averageWomenLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 0.85,
      min: 0.75,
      gender: 'female',
      clasification: 'average'
    });
    const lowWomenLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 0.65,
      min: 0.55,
      gender: 'female',
      clasification: 'low'
    });
    const veryLowWomenLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 0.45,
      min: 0,
      gender: 'female',
      clasification: 'verylow'
    });
    const excelentManLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 1.50,
      min: 1.40,
      gender: 'male',
      clasification: 'excelent'
    });
    const veryGoodManLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 1.30,
      min: 1.20,
      gender: 'male',
      clasification: 'verygood'
    });
    const goodManLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 1.10,
      min: 1.00,
      gender: 'male',
      clasification: 'good'
    });
    const averageManLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 0.90,
      min: 0.80,
      gender: 'male',
      clasification: 'average'
    });
    const lowManLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 0.70,
      min: 0.60,
      gender: 'male',
      clasification: 'low'
    });
    const veryLowManLactateThreshold = new clasificationsModel({
      aspect: 'lactatethreshold',
      profile: 'swimming',
      max: 0.50,
      min: 0,
      gender: 'male',
      clasification: 'verylow'
    });

    const docs = [excelentWomenEfficiencyLt, excelentManEfficiencyLt, veryGoodWomenEfficiencyLt, veryGoodManEfficiencyLt, goodWomenEfficiencyLt,
      goodManEfficiencyLt, averageWomenEfficiencyLt, averageManEfficiencyLt, lowWomenEfficiencyLt, lowManEfficiencyLt, veryLowWomenEfficiencyLt, veryLowManEfficiencyLt,
      excelentWomenEfficiencyAnat, excelentManEfficiencyAnat, veryGoodWomenEfficiencyAnat, veryGoodManEfficiencyAnat, goodWomenEfficiencyAnat,
      goodManEfficiencyAnat, averageWomenEfficiencyAnat, averageManEfficiencyAnat, lowWomenEfficiencyAnat, lowManEfficiencyAnat, veryLowWomenEfficiencyAnat, veryLowManEfficiencyAnat,
      excelentWomenAnaThreshold, excelentManAnaThreshold, veryGoodWomenAnaThreshold, veryGoodManAnaThreshold, goodWomenAnaThreshold, goodManAnaThreshold,
      averageWomenAnaThreshold, averageManAnaThreshold, lowWomenAnaThreshold, lowManAnaThreshold, veryLowWomenAnaThreshold, veryLowManAnaThreshold,
      excelentWomenLactateThreshold, excelentManLactateThreshold, veryGoodWomenLactateThreshold, veryGoodManLactateThreshold, goodWomenLactateThreshold,
      goodManLactateThreshold, averageWomenLactateThreshold, averageManLactateThreshold, lowWomenLactateThreshold, lowManLactateThreshold,
      veryLowWomenLactateThreshold, veryLowManLactateThreshold];
    
    //  Limpiar base de datos primero si existe algo
    clasificationsModel
      .deleteMany({})
      .exec((err, res) => {
        if (err) { 
          console.log('Algo ha fallado: ', err);
          callback(err);
        } else {
          clasificationsModel
            .insertMany(docs, (errr, res) => {
              if (err) {
                console.log('Algo ha fallado');
                callback(errr);
              } else {
                console.log('Modelos de clasificacion de natacion insertado');
                callback(null, res);
              }
            });
        }
      });
  },
};