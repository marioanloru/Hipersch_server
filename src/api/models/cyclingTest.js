const mongoose = require('mongoose');
const User = require('./user');
const Clasification = require('./clasifications');
const Schema = mongoose.Schema;

const cyclingTest = new Schema({
  athlete: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' },
  map: { type: Number },
  vo2max: { type: Number },
  anaThreshold: { type: Number},
  at: { type: Number},
  p6sec: { type: Number },
  p1min: { type: Number },
  p6min: { type: Number },
  p20min: { type: Number },
  peakPower: { 
    type: Number,
    required: true
  },
  type: { 
    type: String,
    required: true,
    default: 'default'
  },
  testId: { 
    type: String, 
    required: true, 
    unique: true },
  date: { 
    type: Date, 
    default: Date.now },
});

module.exports = mongoose.model('cyclingTest', cyclingTest);
