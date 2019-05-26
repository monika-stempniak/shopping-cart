const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/books';

module.exports = async (req, res, next) => {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(connectionString, { useNewUrlParser: true });
    }
    next();
};
