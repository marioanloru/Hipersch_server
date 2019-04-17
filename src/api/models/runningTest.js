const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runningTest = new Schema({
  //athlete: { type: ObjectId, unique: true, required: true },
  distance: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('runningTest', runningTest);
