const express = require('express');
const app = express();
const fs = require('fs');
const books = require('./books.json');
const addToCart = require('./utils/addToCart');
const getBooksList = require('./utils/getBooksList');

app.get('/books', (req, res, next) => {
  try {
    const books = getBooksList();
    res.send(books);
  } catch(error) {  
    next(error)
  }
});

app.get('/books/:id', (req, res, next) => {
  const { id } = req.params;
  try {
    const books = getBooksList();
    const pickedBook = JSON.parse(books).find(book => +id === book.id)
    res.send(pickedBook);
    addToCart(pickedBook);
  } catch(error) {  
    next(error)
  }
});

app.use((error, req, res) => {
  res.status(400).send(error.message);
});

app.listen(4000, () => console.log('server started'));
