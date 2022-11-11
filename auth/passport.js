const dotenv = require('dotenv')
dotenv.config()
var {User} = require("../models/user"); 
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = process.env.SECRET;
module.exports = passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    User.getUserbyId(jwt_payload.id, function(err, user) {
        if (err) {
            
            return done(err, false);
        }
        if (user) {
            
            return done(null, user);
            
        } else {
            
            return done(null, false);
            
        }
    });
}));