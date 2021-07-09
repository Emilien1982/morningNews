var express = require('express');
var router = express.Router();
const userModel = require('../model/userModel');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


/* SIGN UP */
router.post('/sign-up', async (req, res) => {
  let userAlreadyExist = false;
  if (req.body.usernameFromFront && req.body.passwordFromFront && req.body.emailFromFront) {
    userAlreadyExist = await userModel.findOne({
      email: req.body.emailFromFront
    });
  } else {
    return res.status(400).json({message: 'Username, email and/or password missing'});
  }
  if (userAlreadyExist) {
    return res.status(409).json({message: 'this email is already taken. Try again with another email or use the link "I forgot my password".'});
  }

  const newUser = new userModel({
    userName: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    pwdHash: bcrypt.hashSync(req.body.passwordFromFront, Number(process.env.CRYPT_COST)),
    token: uid2(32),
    language: 'fr'
  });

  const savedUser = await newUser.save();

  if (savedUser) {
    return res.status(201).json({userCreated: true, token: savedUser.token});
  } else {
    return res.status(503).json({userCreated: false, message: 'The DataBase didn t save the new user'});
  }
});

/* SIGN IN */
router.post('/sign-in', async (req, res) => {
  let user = false;
  if (req.body.emailFromFront && req.body.passwordFromFront) {
    user = await userModel.findOne({email: req.body.emailFromFront});
  } else {
    return res.status(400).json({
      loginCorrect: false,
      message: 'Email and/or password missing'
    });
  }
  
  if (user && bcrypt.compareSync(req.body.passwordFromFront, user.pwdHash)) {
    const { _id, userName, email } = user;
    // destruturation pour renvoyer le user sans le password
    const newToken = uid2(32);
    const updatedUser = await userModel.updateOne(user, {token: newToken}).exec();
    //console.log('UPDATED: ', updatedUser);
    if (updatedUser.nModified === 1){
      return res.status(200).json({
        loginCorrect: true,
        user:{ userName, email, token: newToken }
      });
    }
  }

  return res.status(401).json({
    loginCorrect: false,
    message: 'Email and/or password incorrect'
  });
});

module.exports = router;
