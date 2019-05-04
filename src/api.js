const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const addToCart = require('./utils/addToCart');
const getCart = require('./utils/getCart');
const getBooksList = require('./utils/getBooksList');
const removeFromCart = require('./utils/removeFromCart');
const addNewBook = require('./utils/addNewBook');

// TODO: add books to books list UI

const checkToken = (req, res, next) => {
  if (req.headers.token === 'user') {
    next();
  } else {
    res.status(401).send("wrong password");
  }
}

const useBodyParser = (bodyParser.json());

app.post('/books/new', checkToken, useBodyParser, (req, res, next) => {
  const newBook = req.body;
  try {
    const books = addNewBook(newBook);
    res.send(books);
  } catch(error) {  
    next(error)
  }
});

app.get('/books', (req, res, next) => {
  try {
    const books = getBooksList();
    res.send(books);
  } catch(error) {  
    next(error)
  }
});

app.get('/cart/:userId', (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = getCart(userId);
    res.send(cart);
  } catch(error) {  
    next(error)
  }
});

app.post('/cart/:userId/:bookId', (req, res, next) => {
  const { userId, bookId } = req.params;
  try {
    const cart = addToCart(userId, bookId);
    res.send(cart);
  } catch(error) {
    next(error)
  }
});

app.delete('/cart/:userId/:bookId', (req, res, next) => {
  const { userId, bookId } = req.params;
  try {
    const cart = removeFromCart(userId, bookId);
    res.send(cart);
  } catch(error) {  
    next(error)
  }
});

app.use((error, req, res, next) => {
  res.status(400).send(error.message);
});

app.listen(4000, () => console.log('server started'));
