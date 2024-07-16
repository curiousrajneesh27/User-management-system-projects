const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/textapp1');

const userSchema = mongoose.Schema({
    Image: String,
    email: String,
    name: String
})

module.exports = mongoose.model('user', userSchema);