var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userid: String,
    username: String
})

// mongoo.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);