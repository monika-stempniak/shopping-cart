const { readFileSync, writeFile } = require('fs');

const getProductsList = require('./getProductsList');

function removeFromCart(bookId) {
  try {
    const booksJson = readFileSync('./books.json', 'utf8');
    const books = JSON.parse(booksJson);

    const updatedBooks = books.map(book => {
      if (book.id === +bookId) {
        book.amount += 1;
      }
      return book;
    })

    writeFile('books.json', JSON.stringify(updatedBooks), function (err) {
      if (err) throw err;
      console.log('successfully written books.json');
    });

    const cartJson = readFileSync('./cart.json', 'utf8');

    const cart = JSON.parse(cartJson);
    const updatedCart = cart.filter(bookInCart => bookInCart.id !== +bookId);

    let cartWithBooks = "";
    if (updatedCart.length !== 0) {
      cartWithBooks = JSON.stringify(updatedCart);
    }
  
    writeFile('cart.json', cartWithBooks, function (err) {
      if (err) throw err;
      console.log('successfully written cart.json');
    });
  
    return cartWithBooks;
  } catch(error) {
    console.log(error);
  }
}

module.exports = removeFromCart;
