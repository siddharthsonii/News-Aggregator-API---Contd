const allnewsRoutes = require('express').Router();
const Userall = require('../models/user');
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authJWT');
const NEWS_API_KEY = '2f5ba1de7c8e48839714570c4f771ee6';
const {myAsyncFunction} = require('../helpers/newsHelper');
const ObjectId = require('mongodb').ObjectId;
// require('dotenv').config();
// const NEWS_API_KEY = process.env.NEWS_API_KEY;

allnewsRoutes.use(bodyParser.json());

// News Aggregator Welcome Message
allnewsRoutes.get('/', (req, res) => {
  return res.status(200).send('Welcome to News Aggregator API.');
});

// Register New User
allnewsRoutes.post('/register', function(req, res) {
  const user = new Userall({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    preferences: req.body.preferences
  });

  user.save().then(data => {
    return res.status(200).json({message: "User registration done successfully"});
  }).catch(err => {
    return res.status(500).json({message: `User registration failed ${err}`});
  });
});

// Login User
allnewsRoutes.post('/login', function(req, res) {
  let emailPassed = req.body.email;
  let passwordPassed = req.body.password;

  Userall.findOne({
    email: emailPassed
  }).then((user) => {
    var passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
    if(!passwordIsValid){
      return res.status(401).json({message: "Invalid Password!"});
    }
    
    // If Password Matches then we need to generate the Token
    var token = jwt.sign({
      id: user.id,
    }, "THIS IS SECRET", {
      expiresIn: 86400
    });

    return res.status(200).json({
      user: {
        id: user.id
      },
      message: "Login successfully",
      accessToken: token
    });
  }).catch(err => {
    return res.status(404).json({message: "User not found"});
  });
});

// To GET News Based On Logedin User Preference
allnewsRoutes.get('/news', verifyToken, function(req, res) {
  if(req.user){
    const userId = req.user;
    Userall.findOne({
      _id: userId
    }).then((user) => {
      if (!user) {
        return res.status(401).json('user not found.');
      }
      const userPreference = user.preferences;
      const apiUrl = `https://newsapi.org/v2/top-headlines?category=${userPreference}&apiKey=${NEWS_API_KEY}`;

      myAsyncFunction(apiUrl)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.error('Error calling async function:', error);
      });
    }).catch(err => {
      return res.status(500).json({message: "'Internal Server Error'"});
    });
  } else {
    return res.status(400).send("Request you send has something incorrect.");
  }
});

// To GET News Preference Of Loggedin User
allnewsRoutes.get('/preferences', verifyToken, function(req, res) {
  if(req.user){
    const userId = req.user;
    Userall.findOne({
      _id: userId
    }).then((user) => {
      if (!user) {
        return res.status(401).json('user not found.');
      }
      const userPreference = user.preferences;
      return res.status(200).json({preferences: userPreference});
    }).catch(err => {
      return res.status(500).json({message: "'Internal Server Error'"});
    });
  } else {
    return res.status(400).send("Request you send has something incorrect.");
  }
});

// To Update News Preference Of Loggedin User
allnewsRoutes.post('/preferences', verifyToken, async function(req, res) {
  if(req.user){
    var preferencesUpdt = req.body.preferences;
    const userId = req.user;
    const objectId = new ObjectId(userId);
    const result = await Userall.updateOne(
      { _id: objectId },
      { $set: {preferences : preferencesUpdt} }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json(`Preferences of User ID ${userId} updated successfully.`);
    } else {
      return res.status(401).json(`No User found with ID ${userId}`);
    }
  } else {
    return res.status(400).send("Request you send has something incorrect.");
  }
});

module.exports = allnewsRoutes;