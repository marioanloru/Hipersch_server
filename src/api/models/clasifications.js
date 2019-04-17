const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clasifications = new Schema({
  aspect: { type: String, required: true },
  profile: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  gender: { type: String, required: true },
  clasification: { type: String, required: true }
});


module.exports = mongoose.model('clasifications', clasifications);
