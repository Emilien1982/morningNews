var express = require('express');
var router = express.Router();
const wishlistModel = require('../model/wishlistModel');
const userModel = require('../model/userModel');



/* Get the wishlist of the user */
router.get('/wishlist', async (req, res) => {
  const { token } = req.query;
  console.log('GET TOKEN: ', token);
  const user = await userModel.findOne({token: token});
  if (!user){
    return res.status(400).json({err: 'current token don t match any user'});
  }
  const userId = user._id;
  const userWishlist = await wishlistModel.findOne({userId});
  if (!userWishlist) {
    return res.status(400).json({err: 'This user has no wishlist in database'});
  }
  //console.log('wishlist: ', userWishlist.articles);
  return res.status(200).json({articles: userWishlist.articles});
})


/* Add article in the wishlist */
router.post('/wishlist', async (req, res) => {
  const {article, token} = req.body;
  const user = await userModel.findOne({token: token});
  if (!user){
    return res.status(400).json({err: 'current token don t match any user'});
  }
  const userId = user._id;
  let userWishlist = await wishlistModel.findOne({userId});
  let saved;
  if(!userWishlist){
    userWishlist = new wishlistModel({
      userId, 
      articles: [article]
    });
    saved = await userWishlist.save();
  } else {
    saved = await wishlistModel.updateOne(userWishlist, {articles: [...userWishlist.articles, article]});
  }
  if (saved.nModified === 1 || saved.userId ) {
    return res.status(200).json({ articleAdded: true });
  } else {
    return res.status(400).json({err: 'Article not saved in database'})
  }
});



/* Delete an article from the user wishlist */
router.delete('/wishlist', async (req, res) => {
  const {title, token} = req.body;
  const user = await userModel.findOne({token: token});
  if (!user){
    return res.status(400).json({err: 'current token don t match any user'});
  }
  const userId = user._id;
  const userWishlist = await wishlistModel.findOne({userId});
  if(!userWishlist){
    return res.status(400).json({err: 'This user has no wishlist in database'});
  }
  const articlelist = userWishlist.articles;
  const newArticleList = articlelist.filter(article => article.title !== title);
  const saved = await wishlistModel.updateOne(userWishlist, {articles: newArticleList});
  if (saved.nModified === 1) {
    return res.status(200).json({ articleRemoved: true });
  } else {
    return res.status(400).json({err: 'Article not removed from database'})
  }
})

module.exports = router;
