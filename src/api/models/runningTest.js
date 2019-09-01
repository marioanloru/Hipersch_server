const mongoose = require('mongoose');
const User = require('./user');
const Clasification = require('./clasifications');
const Schema = mongoose.Schema;

//  Running test mongo model
const runningTest = new Schema({
  athlete: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  distance: { 
    type: Number, 
    required: true 
  },
  speed: { 
    type: Number, 
    required: true 
  },
  MAVvVo2max: { 
    type: Number, 
    required: true 
  },
  vo2max: { 
    type: Number, 
    required: true 
  },
  vat: { 
    type: Number, 
    required: true 
  },
  testId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('runningTest', runningTest);
