var express = require('express');
var router = express.Router();
const userModel = require('../model/userModel');
var request = require('sync-request');

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/load-source', async (req, res) => {
  const searchUser = await userModel.findOne({ token: req.query.user });
  console.log(req.query.user);
  var result = await request('GET', `https://newsapi.org/v2/top-headlines/sources?country=${searchUser.language}&apiKey=00eb781fbc674c2185c39fc309988ef3`);
  var resultJSON = await JSON.parse(result.body);
  res.json(resultJSON);
});

router.put('/change-language/:user', async (req, res) => {
  console.log(req.body);
  await userModel.updateOne({ token: req.params.user }, { language: req.body.language });
  res.json({ result: true })
});

module.exports = router;
