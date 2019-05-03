const { readFileSync, writeFile } = require('fs');

function addToCart(userId, bookId) {
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

    const cartJson = readFileSync('./cart.json', 'utf8');

    let cart = [];
    let userCart = [];
    let isBookInCart = false;
    let otherUsersCart = [];
    if (cartJson) {
      cart = JSON.parse(cartJson);
      userCart = cart.filter(book => book.userId === +userId);
      isBookInCart = userCart.some(bookInCart => bookInCart.id === +bookId);
      otherUsersCart = cart.filter(book => book.userId !== +userId)
    }

    if (!isBookInCart) {
      pickedBook.userId = +userId;
      userCart.push(pickedBook);
    }

    const allUsersCart = otherUsersCart.concat(userCart);
  
    writeFile('cart.json', JSON.stringify(allUsersCart), function (err) {
      if (err) throw err;
      console.log('successfully written cart.json');
    });
  
    return userCart;
  } catch(error) {
    console.log(error);
  }
}

module.exports = addToCart;
