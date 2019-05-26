const mongoose = require('mongoose');

module.exports = mongoose.model('Cart', {
    "series": String,
    "author": String,
    "title": String,
    "year": String,
    "amount": Number,
    "price": Number
});
