const { readFileSync } = require('fs');

function getBooksList() {
  const response = readFileSync('./books.json', 'utf8');
  
  return response;
}

module.exports = getBooksList;
