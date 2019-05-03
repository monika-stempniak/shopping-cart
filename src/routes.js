const express = require('express');
const app = express();
const fs = require('fs');

const books = require('./books.json');
const addToCart = require('./utils/addToCart');
const getProductsList = require('./utils/getProductsList');
const removeFromCart = require('./utils/removeFromCart');

app.get('/:fileName', (req, res, next) => {
  const { fileName } = req.params;
  try {
    const fileData = getProductsList(fileName);
    res.send(fileData);
  } catch(error) {  
    next(error)
  }
});

app.post('/cart/:id', (req, res, next) => {
  const { id } = req.params;
  try {
    const books = getProductsList("books");
    const pickedBook = JSON.parse(books).find(book => +id === book.id)
    const cart = addToCart(pickedBook);
    res.send(cart);
  } catch(error) {
    next(error)
  }
});

app.delete('/cart/:id', (req, res, next) => {
  const { id } = req.params;
  try {
    const books = getProductsList("cart");
    const pickedBook = JSON.parse(books).find(book => +id === book.id)
    const cart = removeFromCart(pickedBook);
    res.send(cart);
  } catch(error) {  
    next(error)
  }
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(400).send(error.message);
});

app.listen(4000, () => console.log('server started'));
