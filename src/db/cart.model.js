const mongoose = require('mongoose');

module.exports = mongoose.model('Cart', {
    "user_id": String,
    "book_id": String,
    "series": String,
    "author": String,
    "title": String,
    "year": String,
    "amount": Number,
    "price": Number
});
