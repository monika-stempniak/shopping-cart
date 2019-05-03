const { readFileSync, writeFile } = require('fs');

function removeFromCart(book) {
  try {
    const cartJson = readFileSync('./cart.json', 'utf8');

    const cart = JSON.parse(cartJson);
    const updatedCart = cart.filter(bookInCart => bookInCart.id !== book.id);

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
