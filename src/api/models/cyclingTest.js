const mongoose = require('mongoose');
const User = require('./user');
const Clasification = require('./clasifications');
const Schema = mongoose.Schema;

const cyclingTest = new Schema({
  athlete: { type: Schema.Types.ObjectId, ref: 'User' },
  map: { type: Number, required: true },
  vo2max: { type: Number, required: true },
  anaThreshold: { type: Number, required: true },
  at: { type: Number, required: true },
  testId: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('cyclingTest', cyclingTest);
