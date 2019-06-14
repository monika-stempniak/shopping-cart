const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    "login": String,
    "password": {
        type: String,
        default: "p@ssword",
    }
});
