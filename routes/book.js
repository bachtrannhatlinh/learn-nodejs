const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Create a new book
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        published_date: req.body.published_date,
        pages: req.body.pages
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});

// Update a book
router.patch('/:id', getBook, async (req, res) => {
    if (req.body.title != null) {
        res.book.title = req.body.title;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }
    if (req.body.published_date != null) {
        res.book.published_date = req.body.published_date;
    }
    if (req.body.pages != null) {
        res.book.pages = req.body.pages;
    }
    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
    try {
        await res.book.remove();
        res.json({ message: 'Deleted Book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.book = book;
    next();
}

module.exports = router;
