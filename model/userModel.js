const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  content: String,
  urlToImage: String
});

const userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  pwdHash: {type: String, required: true},
  token: String,
  language: String,
  articles: [ articleSchema ]
});

module.exports = mongoose.model('users', userSchema);