const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  role: { type: String }
});

//User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', User);
