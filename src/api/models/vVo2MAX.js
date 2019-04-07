const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vVo2MAX = new Schema({
  profile: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  gender: { type: String, required: true },
  clasification: { type: String, required: true }
});


module.exports = mongoose.model('User', User);
