const vVo2MAX = require('../models/vVo2MAX');
module.exports = {
  initialize: () => {
    const excelentWomen = new vVo2MAX({
      profile: 'running',
      max: 21.8,
      min: 20,
      gender: 'women',
      clasification: 'excelente'
    });
    const excelentMan = new vVo2MAX({
      profile: 'running',
      max: 24,
      min: 22.2,
      gender: 'women',
      clasification: 'excelente'
    });
    const docs = [excelentWomen, excelentMan];
    vVo2MAX
      .insertMany(docs, (err, res) => {
        if (err) {
          console.log('Algo ha fallado');
          res.status(500).json(err);
        } else {
          console.log('OKKK');
          res.status(200).json(res);
        }
      });
  }

}