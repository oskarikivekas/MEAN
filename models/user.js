const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// config file not needed since we can just fetch env variables 

const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
    }, 
    username:{
       type: String,
       required: true,
       unique: true 
    }, 
    email:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema); 

// functions

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    User.findOne({username: username}, callback)
}

module.exports.createUser = (newUser, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}

module.exports.comparePassword = (password, hashedPw, callback) => {
    bcrypt.compare(password, hashedPw, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
}

module.exports = User;