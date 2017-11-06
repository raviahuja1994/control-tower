/**
 * Created by Vivek Reddy on 05-Jul-17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username:username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
        console.log(err);
    newUser.password = hash;
    newUser.save(callback);
});
});
}

module.exports.comparePassword = function (candidatePassord, hash, callback) {
 bcrypt.compare(candidatePassord, hash, function (err, isMatch) {
     if(err) console.log(err);
     callback(null, isMatch);
 });
}