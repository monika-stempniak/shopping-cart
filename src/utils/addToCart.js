const { readFileSync, writeFile } = require('fs');

function addToCart(book) {
  try {
    const cart = readFileSync('./cart.json', 'utf8');

    let updatedCart = [];
    let isBookInCart = false;
    if (cart) {
      updatedCart = [...JSON.parse(cart)];
      isBookInCart = updatedCart.some(bookInCart => bookInCart.id === book.id)
    }

    if (!isBookInCart) {
      updatedCart.push(book);
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
