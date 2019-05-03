const { readFileSync } = require('fs');

function getBooksList() {
  const books = readFileSync('./books.json', 'utf8');

  return books;
}

module.exports = getBooksList;
