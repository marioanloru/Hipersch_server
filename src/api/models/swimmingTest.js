const mongoose = require('mongoose');
const User = require('./user');
const Clasification = require('./clasifications');
const Schema = mongoose.Schema;

const swimmingTest = new Schema({
  athlete: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  indexLT: { 
    type: Number, 
    required: true 
  },
  indexANAT: { 
    type: Number, 
    required: true 
  },
  anaThreshold: { 
    type: Number, 
    required: true 
  },
  lactateThreshold: { 
    type: Number, 
    required: true 
  },
  testId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  timeTwoHundred: {
    type: Number,
    required: true
  },
  timeFourHundred: {
    type: Number,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('swimmingTest', swimmingTest);
