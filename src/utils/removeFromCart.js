const { readFileSync, writeFile } = require('fs');

function removeFromCart(userId, bookId) {
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
    const userCart = cart
      .filter(book => book.userId === +userId)
      .filter(book => book.id !== +bookId);

    const otherUsersCart = cart.filter(book => book.userId !== +userId)

    let allUsersCart = otherUsersCart.concat(userCart);
  
    writeFile('cart.json', JSON.stringify(allUsersCart), function (err) {
      if (err) throw err;
      console.log('successfully written cart.json');
    });
  
    return userCart;
  } catch(error) {
    console.log(error);
  }
}

module.exports = removeFromCart;
