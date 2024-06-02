const mongoose = require('mongoose');

const userData = mongoose.Schema({
    userId: String,
    password: String
})

module.exports = mongoose.model('userauths', userData);