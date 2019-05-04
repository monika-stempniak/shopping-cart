const { readFileSync, writeFile } = require('fs');

function addNewBook(book) {
  try {
    const booksJson = readFileSync('./books.json', 'utf8');
    const books = JSON.parse(booksJson);

    const lastBook = books[books.length - 1];
    const newBookId = lastBook.id + 1;
    const newBook = book;
    newBook.id = newBookId;
    books.push(newBook);

    writeFile('books.json', JSON.stringify(books), function (err) {
      if (err) throw err;
      console.log('successfully written books.json');
    });
  
    return books;
  } catch(error) {
    console.log(error);
  }
}

module.exports = addNewBook;
