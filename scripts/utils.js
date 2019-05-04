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
  }
  // TODO: Inicializar tabla de natacion

};