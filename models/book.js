const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    published_date: {
        type: Date,
        required: true
    },
    pages: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);
