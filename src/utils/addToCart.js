const { readFileSync, writeFile } = require('fs');

const getProductsList = require('./getProductsList');

function addToCart(bookId) {
  try {
    const booksJson = readFileSync('./books.json', 'utf8');
    const books = JSON.parse(booksJson);
    const pickedBook = books.find(book => +bookId === book.id);

    const updatedBooks = books.map(book => {
      if (book.id === +bookId && book.amount > 0) {
        book.amount -= 1;
      }
      return book;
    })

    writeFile('books.json', JSON.stringify(updatedBooks), function (err) {
      if (err) throw err;
      console.log('successfully written books.json');
    });

    const cart = readFileSync('./cart.json', 'utf8');

    let updatedCart = [];
    let isBookInCart = false;
    if (cart) {
      updatedCart = JSON.parse(cart);
      isBookInCart = updatedCart.some(bookInCart => bookInCart.id === +bookId)
    }

    if (!isBookInCart) {
      updatedCart.push(pickedBook);
    }
  
    const cartWithBooks = JSON.stringify(updatedCart);
  
    writeFile('cart.json', cartWithBooks, function (err) {
      if (err) throw err;
      console.log('successfully written cart.json');
    });
  
    return cartWithBooks;
  } catch(error) {
    console.log(error);
  }
}

module.exports = addToCart;
