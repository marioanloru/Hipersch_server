const clasificationsModel = require('../src/api/models/clasifications')

module.exports = {
  initializeRunningTable(callback) {
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
                console.log('Modelo de clasificacion insertado');
                callback(null, res);
              }
            });
        }
      });
  }
  // TODO: Inicializar tabla de ciclismo y de natacion
}