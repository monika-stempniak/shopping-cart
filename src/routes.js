const express = require('express');
const app = express();
const fs = require('fs');
const books = require('./books.json');

app.get('/books', (req, res, next) => {
  fs.readFile("books.json", (err, data) => {
    if (err) {
      next(new Error('no file'));
    } else {
      res.send(data);
    }
  })
});

app.use((error, req, res) => {
  res.status(404).send(error.message);
});

app.listen(4000, () => console.log('server started'));
