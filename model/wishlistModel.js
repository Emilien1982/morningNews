const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  content: String,
  urlToImage: String
});

const wishlistSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  articles: [ articleSchema ]
});

module.exports = mongoose.model('wishlists', wishlistSchema);