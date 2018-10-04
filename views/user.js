var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userid: String,
    username: String
})

userModel = mongoose.model('User', UserSchema);
module.exports = userModel;