var express = require('express');
var router = express.Router();
const userModel = require('../model/userModel');
var request = require('sync-request');


router.get('/load-source', async (req, res) => {
  const searchUser = await userModel.findOne({ token: req.query.user });
  //console.log(req.query.user);
  var result = await request('GET', `https://newsapi.org/v2/top-headlines/sources?country=${searchUser.language}&apiKey=00eb781fbc674c2185c39fc309988ef3`);
  var resultJSON = await JSON.parse(result.body);
  res.json(resultJSON);
});

router.put('/change-language/:user', async (req, res) => {
  //console.log(req.body);
  await userModel.updateOne({ token: req.params.user }, { language: req.body.language });
  res.json({ result: true })
});

/* Get the wishlist of the user */
router.get('/wishlist', async (req, res) => {
  const { token } = req.query;
  //console.log('GET TOKEN: ', token);
  const user = await userModel.findOne({token: token});
  if (!user){
    return res.status(400).json({err: 'current token don t match any user'});
  }
  return res.status(200).json({articles: user.articles});
})


/* Add article in the wishlist */
router.post('/wishlist', async (req, res) => {
  const {article, token} = req.body;
  const user = await userModel.findOne({token: token});
  if (!user){
    return res.status(400).json({err: 'current token don t match any user'});
  }
  const articleAlreadyAdded = user.articles.findIndex(art => art.title === article.title) !== -1;
  if (articleAlreadyAdded) {
    return res.status(304).json({err: 'user already hads this article in wishlist'});
  }
  user.articles.push(article);
  const saved = await user.save();
  //console.log('SAVED: ', saved);
  if (saved) {
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
  user.articles = user.articles.filter(article =>  article.title !== title);

  const saved = await user.save();
  if (saved) {
    return res.status(200).json({ articleRemoved: true });
  } else {
    return res.status(400).json({err: 'Article not removed from database'})
  }
})

module.exports = router;
