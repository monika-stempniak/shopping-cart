const express = require('express');
const Book = require('./book.model');
const router = express.Router();

router.use(express.json());

// http://localhost:4000/books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/books/id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (book) {
            res.send(book);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/books/new
router.post('/new', async (req, res) => {
    try {
        console.log(req.body.newBook);
        const book = new Book(req.body.newBook);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/books/id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        Object.assign(book, req.body);
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/books/id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        await Book.deleteOne(book);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
