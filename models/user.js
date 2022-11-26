const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

const User = module.exports = mongoose.model('user', UserSchema); 

// db functions

// error handling to be improved..

module.exports.getUserById = async (id) => {
    return await User.findById(id);
}

module.exports.getUserByUsername = async (username) => {
    return await User.findOne({username: username});
}

module.exports.getUserByEmail = async (email) => {
    return await User.findOne({email: email});
}

module.exports.createUser = async (user) => {
    try {
        const pw = await user.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pw, salt);
        
        user.password = hash;
        await user.save(); 
        return true;    

    } catch (err) {
        console.log(err);
        return false;
    }
   
}

module.exports.comparePassword = async (pw, hashedPw) => {
    return await bcrypt.compare(pw, hashedPw);    
}
