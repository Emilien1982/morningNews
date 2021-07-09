const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  pwdHash: {type: String, required: true},
  token: String
});

module.exports = mongoose.model('users', userSchema);