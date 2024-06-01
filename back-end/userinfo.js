const mongoose = require('mongoose');

const userData = mongoose.Schema({
    id: Number,
    name: String,
    city: String,
    email: String,
    phone: Number,
})

module.exports = mongoose.model('userinfos', userData)