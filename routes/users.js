const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const jwt = require("jsonwebtoken");
var passwordValidator = require("password-validator");
const passport = require("passport");

var schema = new passwordValidator();
schema.is().min(8).has().uppercase().has().lowercase().has().digits().has().symbols();

const User = require("../models/user");

/* REGISTER POST */
router.post("/register",
    //In the real world you would want to actually sanitize all inputs
    body("username").trim().escape(),
    body("password").trim(),
    async (req, res, next) => {

        let alreadyUser = await User.getUserByUsername(req.body.username);

        if (alreadyUser) {
            return res.json({ success: false, msg: 'Already user with this username, try to login!' });  
        }
        
        let emailInUse = await User.getUserByEmail(req.body.email);
        
        if (emailInUse) {
            return res.json({ success: false, msg: 'Email is already in use, try to login!' });   
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
          });
        
        let success = await User.createUser(newUser);

        if (success) {
            res.json({ success: true, msg: 'User registered'}); 
        } else {
            res.json({ success: false, msg: 'Failed to register user' });   
        }
    }
);

/* LOGIN POST */
router.post("/login",
    body("username").trim().escape(),
    body("password").trim(),
    async (req, res, next) => {
        const password = req.body.password;
        let user = await User.getUserByUsername(req.body.username);
 
        if (!user){
            return res.json({ success: false, msg: 'User not found' }); 
        }
            
        let isMatch = await User.comparePassword(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ data: user }, process.env.SECRET, {
            expiresIn: 7200 // 2 hours
            });

            res.json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
            });

        } else {
            return res.json({ success: false, msg: 'Wrong password' });
        }
});
  
    
// Profile
router.get('/profile', 
    passport.authenticate('jwt', { session: false }), 
    (req, res, next) => {
        
    res.json({
    user: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
    }
    });
});

module.exports = router;
