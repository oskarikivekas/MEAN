var express = require('express');
const { ExtractJwt } = require('passport-jwt');
const passport = require('../auth/passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', passport.authenticate("jwt", {session: false}),function(req, res, next) {
  // IF not logged in
  // This is normally done using some kind of session management. 
  if (!req.body.user) {
    res.json({user: user, signedIn: true})
  } else {
    res.json({user: null, signedIn: false});
  }
  
});

router.post('/login', async (req, res, next) => {

  User.getUserByUsername(username, (user, err) => {
    if(err) throw err;

    if (!user) {
      res.status(403).json({success: false, msg: "Incorrect username"});
    }
    User.comparePassword(req.body.password, user.password, (success, err) => {
      if (err) throw err;
      if(!success) {
        res.status(403).json({success: false, msg: "Incorrect password"});
      }
      // Token set to expire in 2 hours
      const token = jwt.sign({data: user}, process.env.SECRET, {expiresIn: 7200});
      res.json({
        success: true,
        token: 'JWT '+ token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      });
    });
  });
});

router.post('/register', async (req, res, next) => { 
  //check if user already exists
    //validate password format
    //create user from body
    //try to save user

  //else fail
  res.send("Register" + req.body);
});


router.get("/profile", async (req, res, next) => {
  res.send("Profile page" + req.body);
});



module.exports = router;
