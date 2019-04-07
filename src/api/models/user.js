const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastname: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

//User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', User);
